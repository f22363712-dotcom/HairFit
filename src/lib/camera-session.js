/** Camera lifecycle is separate from rendering so waiting/denied/closed never cuts. */
export class CameraSession {
  constructor({ request, update = () => {} }) {
    this.request = request;
    this.update = update;
    this.status = 'idle';
    this.stream = null;
    this.armed = false;
    this.version = 0;
  }
  get mayCut() { return this.status === 'demo' || (this.status === 'ready' && this.armed); }
  async start() {
    this.stop();
    const version = this.version;
    this.status = 'pending';
    this.update(this);
    try {
      const stream = await this.request();
      if (version !== this.version) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      this.stream = stream;
      this.status = 'ready';
    } catch {
      if (version !== this.version) return;
      this.status = 'error';
    }
    this.update(this);
  }
  arm(value) { this.armed = this.status === 'ready' && Boolean(value); }
  startDemo() { this.stop(); this.status = 'demo'; this.update(this); }
  stop() {
    this.version++;
    this.stream?.getTracks().forEach(track => track.stop());
    this.stream = null;
    this.armed = false;
    this.status = 'idle';
    this.update(this);
  }
}

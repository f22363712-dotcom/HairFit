/** Measured delivery health. Model loading and hand accuracy are separate facts. */
export class HandRuntime{
 constructor({windowSize=32,minDetected=10,minHz=10,maxP95Ms=150,minFreshRatio=.95,maxAgeMs=250,expiryMs=1000}={}){
  Object.assign(this,{windowSize,minDetected,minHz,maxP95Ms,minFreshRatio,maxAgeMs,expiryMs});this.reset();
 }
 reset(){this.frames=[];}
 observe(frame,receivedAt){
  if(this.frames.length&&(receivedAt-this.frames.at(-1).at>this.expiryMs||receivedAt<this.frames.at(-1).at))this.reset();
  const latency=Number.isFinite(frame.latencyMs)&&frame.latencyMs>=0?frame.latencyMs:null;
  this.frames.push({at:receivedAt,start:frame.timestamp,latency,detected:frame.detectedHand===true,
   usable:frame.detectedHand===true&&!frame.stale&&latency!==null&&latency<=this.maxAgeMs});
  if(this.frames.length>this.windowSize)this.frames.shift();
  return this.snapshot();
 }
 snapshot(now){
  const f=this.frames,detected=f.filter(r=>r.detected),timed=detected.filter(r=>r.latency!==null),fresh=detected.filter(r=>r.usable);
  const times=timed.map(r=>r.latency).sort((a,b)=>a-b),p95Ms=times.length?times[Math.ceil(times.length*.95)-1]:null;
  const duration=f.length?f.at(-1).at-f[0].start:0;
  const usableHz=duration>0?fresh.length/duration*1000:0,freshRatio=detected.length?fresh.length/detected.length:null;
  let status='measuring';
  if(f.length>=this.minDetected&&!detected.length)status='no-hand';
  else if(detected.length>=this.minDetected&&timed.length===detected.length&&duration>=500)
   status=freshRatio>=this.minFreshRatio&&usableHz>=this.minHz&&p95Ms<=this.maxP95Ms?'healthy':'slow';
  if(f.length&&Number.isFinite(now)&&now-f.at(-1).at>this.expiryMs)status='paused';
  return {status,samples:f.length,detected:detected.length,timed:timed.length,fresh:fresh.length,p95Ms,freshRatio,usableHz};
 }
}

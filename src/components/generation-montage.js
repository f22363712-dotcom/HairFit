export function createGenerationMontage(root, sessionStore) {
  const started = Date.now();
  root.innerHTML = `
    <div class="loading-stage" aria-live="polite">
      <div class="orb" aria-hidden="true"></div>
      <h2>正在试出你的新发型</h2>
      <p>两张参考已提交，正在等待图像服务返回。</p>
      <div class="montage-chips" aria-hidden="true">
        <span class="chip-item active">微卷纹理</span><span class="chip-item">侧边渐变</span>
        <span class="chip-item">轻盈刘海</span><span class="chip-item">层次长发</span>
      </div>
      <small class="waiting-tip">已等待 <span id="elapsed-seconds">0</span> 秒。生成可能需要数分钟，请保持页面打开。</small>
      <small class="waiting-tip">画面动效仅用于等待提示。</small>
    </div>`;
  const clock = root.querySelector('#elapsed-seconds');
  const chips = [...root.querySelectorAll('.chip-item')];
  const timer = setInterval(() => {
    const seconds = Math.floor((Date.now() - started) / 1000);
    clock.textContent = seconds;
    chips.forEach((chip, i) => chip.classList.toggle('active', Math.floor(seconds / 2) % chips.length === i));
  }, 1000);
  return { teardown() { clearInterval(timer); } };
}

import { escapeHtml } from '../lib/html.js';
import { CameraSession } from '../lib/camera-session.js';
const SVG_ICONS = {
  upload: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  camera: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
  arrowUpRight: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
  sparkles: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/></svg>`,
  scissors: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  close: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  cube3d: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
};

export function createUploadPanel(root, sessionStore) {
  const state = sessionStore.state;
  const isReady = !!(state.personalImage && state.hairstyleImage);
  const isLoading = state.request.status === 'loading';
  const hasError = state.request.status === 'error';
  const angleCount = (state.personalImage ? 1 : 0) + (state.personalSideImage ? 1 : 0) + (state.personalBackImage ? 1 : 0);

  root.innerHTML = `
    <div class="upload-wrapper">
      ${hasError ? `
        <div class="error-banner">
          <div class="error-icon">!</div>
          <div class="error-content">
            <strong>生成遇到问题</strong>
            <p>${escapeHtml(state.request.message || '请检查网络或配置后重试。已为你保留之前选择的照片。')}</p>
            ${state.request.usage?.logWarning?`<p>${escapeHtml(state.request.usage.logWarning)}</p>`:''}
          </div>
        </div>
      ` : ''}

      <section class="upload-grid">
        <div class="intro-card">
          <div>
            <span class="number">01 / YOUR PHOTO + YOUR INSPIRATION</span>
            <h2>先选一张照片，再选心仪发型</h2>
            <p>上传正面照片和参考发型，先看 AI 换发效果，再进入 3D 试着修剪。</p>
          </div>
          <div class="intro-meta-block">
            <div class="status-line">
              ${isReady ? `已就绪 · 已采集 ${angleCount} 个本人视角` : '等待上传本人正面照与理想发型'}
            </div>
            <p class="intro-subnote">支持本地高清图片或开启摄像头现场采集正/侧/背面</p>
          </div>
        </div>

        <div class="upload-card ${state.personalImage ? 'has-file' : ''}" id="card-personal">
          <div class="card-top">
            <div class="card-title-group">
              <span class="card-label">本人照片 · 正面主照</span>
              <span class="card-badge">${angleCount}/3 视角</span>
            </div>
            ${state.personalImage ? `<button type="button" class="btn-chip-remove" id="clear-personal" title="移除并重选">${SVG_ICONS.close}</button>` : ''}
          </div>

          ${state.personalImage ? `
            <div class="card-preview">
              <img src="${state.personalImage.dataUrl}" alt="我的照片缩略图" />
              <strong>${escapeHtml(state.personalImage.name)}</strong>
            </div>
          ` : `
            <div class="card-empty-prompt">
              <strong>上传清晰的本人正面免冠照</strong>
              <span>保持五官清晰、光线均匀，便于看清换发效果</span>
            </div>
          `}

          <div class="picker-action-row">
            <label class="file-picker-btn">
              ${SVG_ICONS.upload}
              <span>${state.personalImage ? '更换正面照' : '选择正面照'}</span>
              <input id="personal" type="file" accept="image/png,image/jpeg,image/webp" />
            </label>
            <button type="button" class="file-picker-btn btn-cam-snap" id="btn-open-webcam-capture" title="使用摄像头现场拍摄正面/侧面/背面照">
              ${SVG_ICONS.camera}
              <span>镜头直拍</span>
            </button>
          </div>

          <!-- 补充侧面照与背面照（提升 3D 模型多角度还原度） -->
          <div class="multi-angle-drawer">
            <div class="drawer-header">
              <span>补充照片（选填，仅作外观参考）</span>
            </div>
            <div class="angle-slots-grid">
              <div class="angle-mini-slot ${state.personalSideImage ? 'filled' : ''}">
                ${state.personalSideImage ? `
                  <img src="${state.personalSideImage.dataUrl}" alt="侧面照" />
                  <div class="angle-mini-meta">
                    <span>侧面 45°/90°</span>
                    <button type="button" class="mini-remove" id="clear-side" title="移除侧面照">${SVG_ICONS.close}</button>
                  </div>
                ` : `
                  <label class="angle-mini-Upload">
                    <span class="angle-tag">+ 侧面照</span>
                    <small>本人真实侧照</small>
                    <input id="personal-side" type="file" accept="image/png,image/jpeg,image/webp" />
                  </label>
                `}
              </div>

              <div class="angle-mini-slot ${state.personalBackImage ? 'filled' : ''}">
                ${state.personalBackImage ? `
                  <img src="${state.personalBackImage.dataUrl}" alt="背面照" />
                  <div class="angle-mini-meta">
                    <span>背面 / 后脑</span>
                    <button type="button" class="mini-remove" id="clear-back" title="移除背面照">${SVG_ICONS.close}</button>
                  </div>
                ` : `
                  <label class="angle-mini-Upload">
                    <span class="angle-tag">+ 背面照</span>
                    <small>本人真实背照</small>
                    <input id="personal-back" type="file" accept="image/png,image/jpeg,image/webp" />
                  </label>
                `}
              </div>
            </div>
          </div>
        </div>

        <div class="upload-card ${state.hairstyleImage ? 'has-file' : ''}" id="card-hairstyle">
          <div class="card-top">
            <div class="card-title-group">
              <span class="card-label">理想发型 · 造型参考</span>
              <span class="card-badge">提取发色与层次</span>
            </div>
            ${state.hairstyleImage ? `<button type="button" class="btn-chip-remove" id="clear-hairstyle" title="移除并重选">${SVG_ICONS.close}</button>` : ''}
          </div>
          ${state.hairstyleImage ? `
            <div class="card-preview">
              <img src="${state.hairstyleImage.dataUrl}" alt="理想发型缩略图" />
              <strong>${escapeHtml(state.hairstyleImage.name)}</strong>
            </div>
          ` : `
            <div class="card-empty-prompt">
              <strong>选择你想尝试的参考发型图</strong>
              <span>选一张发型轮廓清楚的图，AI 会参考它调整照片中的头发</span>
            </div>
          `}
          <div class="picker-action-row">
            <label class="file-picker-btn">
              ${SVG_ICONS.upload}
              <span>${state.hairstyleImage ? '更换参考发型' : '选择参考发型'}</span>
              <input id="style" type="file" accept="image/png,image/jpeg,image/webp" />
            </label>
          </div>
        </div>
      </section>

      <!-- 摄像头多角度现场自拍模态舱 -->
      <div class="webcam-capture-modal" id="webcam-capture-modal" hidden>
        <div class="webcam-modal-card">
          <div class="webcam-modal-head">
            <div>
              <span class="eyebrow">LIVE STUDIO CAPTURE</span>
              <h3>多角度人像现场采集</h3>
            </div>
            <button type="button" class="btn-chip-remove" id="btn-close-webcam">${SVG_ICONS.close}</button>
          </div>
          <div class="webcam-video-wrap">
            <video id="upload-webcam-video" autoplay playsinline muted></video>
            <div class="webcam-face-guide"></div>
          </div>
          <div class="webcam-snap-actions">
            <button type="button" class="btn-primary btn-sm" data-snap-target="front">${SVG_ICONS.camera}<span>拍为正面主照</span></button>
            <button type="button" class="btn-secondary btn-sm" data-snap-target="side">${SVG_ICONS.camera}<span>拍为侧面照</span></button>
            <button type="button" class="btn-secondary btn-sm" data-snap-target="back">${SVG_ICONS.camera}<span>拍为背面照</span></button>
          </div>
        </div>
      </div>

      <div class="generate-bar">
        <button id="btn-generate" class="btn-primary generate" ${isReady && !isLoading ? '' : 'disabled'}>
          <span>${isLoading ? '正在生成换发预览...' : '生成换发预览'}</span>
          ${SVG_ICONS.arrowUpRight}
        </button>
        <button type="button" id="btn-load-sample" class="btn-outline" ${isLoading ? 'disabled' : ''}>
          ${SVG_ICONS.sparkles}
          <span>体验已生成的示例</span>
        </button>
        <button type="button" id="btn-direct-3d" class="btn-secondary" ${isLoading ? 'disabled' : ''}>
          ${SVG_ICONS.cube3d}
            <span>预设试剪（旧示例）</span>
        </button>
          <button type="button" id="btn-reconstructed-example" class="btn-secondary" ${isLoading?'disabled':''}>体验照片重建模型（不扣费）</button>
      </div>
    </div>
  `;

  // Bind file inputs
  root.querySelector('#personal')?.addEventListener('change', e => {
    readFile(e.target.files[0], file => sessionStore.setPersonalImage(file));
  });

  root.querySelector('#personal-side')?.addEventListener('change', e => {
    readFile(e.target.files[0], file => sessionStore.setPersonalSideImage(file));
  });

  root.querySelector('#personal-back')?.addEventListener('change', e => {
    readFile(e.target.files[0], file => sessionStore.setPersonalBackImage(file));
  });

  root.querySelector('#style')?.addEventListener('change', e => {
    readFile(e.target.files[0], file => sessionStore.setHairstyleImage(file));
  });

  // Bind clear buttons
  root.querySelector('#clear-personal')?.addEventListener('click', e => {
    e.stopPropagation();
    sessionStore.clearPersonalImage();
  });
  root.querySelector('#clear-side')?.addEventListener('click', e => {
    e.stopPropagation();
    sessionStore.clearPersonalSideImage();
  });
  root.querySelector('#clear-back')?.addEventListener('click', e => {
    e.stopPropagation();
    sessionStore.clearPersonalBackImage();
  });
  root.querySelector('#clear-hairstyle')?.addEventListener('click', e => {
    e.stopPropagation();
    sessionStore.clearHairstyleImage();
  });

  // Webcam multi-angle live capture
  let disposed = false;
  const modal = root.querySelector('#webcam-capture-modal');
  const videoEl = root.querySelector('#upload-webcam-video');
  const openCameraButton=root.querySelector('#btn-open-webcam-capture');
  const cameraSession=new CameraSession({
    request:()=>navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:640},facingMode:'user'}}),
    update:session=>{
      if(openCameraButton)openCameraButton.disabled=session.status==='pending';
      if(videoEl)videoEl.srcObject=session.stream;
      if(modal)modal.hidden=session.status!=='ready';
      if(session.status==='error'&&!disposed)alert('无法访问摄像头，请确认浏览器已授予摄像头权限，或直接上传本地照片。');
    }
  });

  function stopWebcam() {
    cameraSession.stop();
  }

  openCameraButton?.addEventListener('click', async () => {
    if(disposed||cameraSession.status==='pending'||cameraSession.status==='ready')return;
    await cameraSession.start();
  });

  root.querySelector('#btn-close-webcam')?.addEventListener('click', stopWebcam);

  root.querySelectorAll('[data-snap-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!videoEl || !videoEl.videoWidth) return;
      const target = btn.getAttribute('data-snap-target');
      const c = document.createElement('canvas');
      c.width = 640;
      c.height = 640;
      const ctx = c.getContext('2d');
      ctx.translate(640, 0);
      ctx.scale(-1, 1);
      const vw = videoEl.videoWidth, vh = videoEl.videoHeight;
      const minD = Math.min(vw, vh);
      ctx.drawImage(videoEl, (vw - minD) * 0.5, (vh - minD) * 0.5, minD, minD, 0, 0, 640, 640);
      const dataUrl = c.toDataURL('image/jpeg', 0.92);
      stopWebcam();
      if (target === 'front') {
        sessionStore.setPersonalImage({ name: 'webcam-front.jpg', type: 'image/jpeg', dataUrl });
      } else if (target === 'side') {
        sessionStore.setPersonalSideImage({ name: 'webcam-side.jpg', type: 'image/jpeg', dataUrl });
      } else if (target === 'back') {
        sessionStore.setPersonalBackImage({ name: 'webcam-back.jpg', type: 'image/jpeg', dataUrl });
      }
    });
  });

  // Bind generate button with anti-concurrency
  root.querySelector('#btn-generate')?.addEventListener('click', () => {
    stopWebcam();
    sessionStore.triggerGenerate();
  });
  root.querySelector('#btn-reconstructed-example')?.addEventListener('click',()=>{stopWebcam();sessionStore.loadReconstructionExample({isCurrent:()=>!disposed&&sessionStore.state.request.status!=='loading'});});

  // 载入真实影棚样片（加载 test-assets 下的真实高清人物照、参考发型与 AI 生成换发照，彻底告别 2D 卡通假脸）
  root.querySelector('#btn-load-sample')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      const [personUrl, styleUrl, genUrl] = await Promise.all([
        fetchAsDataUrl('/test-assets/person.jpg'),
        fetchAsDataUrl('/test-assets/hairstyle.jpg'),
        fetchAsDataUrl('/test-assets/last-generated-preview.png')
      ]);
      if (disposed) return;

      sessionStore.state.personalImage = { name: 'studio-portrait-front.jpg', type: 'image/jpeg', dataUrl: personUrl };
      sessionStore.state.personalSideImage = null;
      sessionStore.state.personalBackImage = null;
      sessionStore.state.hairstyleImage = { name: 'textured-curly-crop.jpg', type: 'image/jpeg', dataUrl: styleUrl };
      if (genUrl) {
        await sessionStore.setGeneratedResult(genUrl, { source: 'demo' });
      }
      stopWebcam();
      sessionStore.setScreen('result');
    } catch (err) {
      if (disposed) return;
      sessionStore.state.request = {status:'error', message:'示例素材无法加载，请上传两张照片继续'};
      sessionStore.notify();
      btn.disabled = false;
    }
  });

  // 直接直接体验 3D 试剪（示例）（若尚未上传照片，自动载入真实高清换发样片驱动 3D 模型）
  root.querySelector('#btn-direct-3d')?.addEventListener('click', async () => {
    stopWebcam();
    if (!sessionStore.state.personalImage && !sessionStore.state.generatedImage) {
      try {
        const [personUrl, styleUrl, genUrl] = await Promise.all([
          fetchAsDataUrl('/test-assets/person.jpg'),
          fetchAsDataUrl('/test-assets/hairstyle.jpg'),
          fetchAsDataUrl('/test-assets/last-generated-preview.png')
        ]);
        if (disposed) return;
        sessionStore.state.personalImage = { name: 'studio-portrait-front.jpg', type: 'image/jpeg', dataUrl: personUrl };
        sessionStore.state.hairstyleImage = { name: 'textured-curly-crop.jpg', type: 'image/jpeg', dataUrl: styleUrl };
        if (genUrl) {
          await sessionStore.setGeneratedResult(genUrl, { source: 'demo' });
        }
      } catch (e) {
        console.warn('Auto load real sample before 3D failed:', e);
      }
    }
    if (!disposed) sessionStore.setScreen('3d');
  });
  return { teardown() { disposed = true; stopWebcam(); } };
}

async function fetchAsDataUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function readFile(file, done) {
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    alert('请选择 PNG、JPEG 或 WebP 格式的图片文件');
    return;
  }
  if (file.size > 10 * 1024 * 1024) { alert('请选择小于 10MB 的图片'); return; }
  const reader = new FileReader();
  reader.onload = () => done({ name: file.name, type: file.type, dataUrl: reader.result });
  reader.readAsDataURL(file);
}

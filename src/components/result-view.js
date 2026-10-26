import { escapeHtml } from '../lib/html.js';

export function createResultView(root, sessionStore) {
  const state = sessionStore.state;
  const image = state.generatedImage;
  const demo = image?.source === 'demo';
  const model=state.reconstruction||{status:'idle'},working=['preparing','reserved','uploading','submitting','pending','processing','downloading'].includes(model.status);
  const ready=model.status==='ready';
  const example=model.source==='example';
  root.innerHTML = `
    <div class="result-container">
      <div class="result-header">
        <span class="eyebrow">02 / YOUR NEXT LOOK</span>
        <h2>先看看，这是不是你想要的样子。</h2>
        <p>${demo ? '当前为已生成示例，本次未调用模型。' : 'AI 换发参考已准备好。'}看清效果后，再到 3D 中试着修剪。</p>
      </div>
      <div class="hero-image-wrapper single-preview">
        <div class="hero-model-badge">${demo ? '已生成示例' : image?.source === 'live' ? '本次 AI 生成' : '恢复的历史结果'}</div>
        <img id="preview-hero-img" class="result-hero-image" src="${escapeHtml(image?.urlOrData || '')}" alt="AI 换发参考图" />
        <div class="reference-strip">
          ${state.personalImage ? `<div class="reference-chip"><img src="${escapeHtml(state.personalImage.dataUrl)}" alt="本人原照" /><span>本人原照</span></div>` : ''}
          ${state.hairstyleImage ? `<div class="reference-chip"><img src="${escapeHtml(state.hairstyleImage.dataUrl)}" alt="理想发型参考" /><span>理想发型</span></div>` : ''}
        </div>
      </div>
      <p class="result-boundary">预览供造型参考，五官可能有变化。发质、发量和实际可剪长度请与理发师确认。</p>
      ${image?.usage?.logWarning?`<p class="result-boundary" role="status">${escapeHtml(image.usage.logWarning)}</p>`:''}
      <div class="actions-row">
        <button id="action-enter-3d" class="btn-primary" ${working?'disabled':''}>${ready?(example?'进入已生成实验模型试剪（不扣费）':'进入照片模型试剪'):model.id?'查询已有建模任务':'生成对应 3D 模型（40 API积分）'}</button>
        <button id="action-model-example" class="btn-secondary" ${working?'disabled':''}>体验已生成实验模型（不扣费）</button>
        <button id="action-regenerate" class="btn-secondary" ${!state.personalImage || !state.hairstyleImage ? 'disabled' : ''}>重新生成</button>
        <button id="action-replace" class="btn-outline">更换图片</button>
      </div>
      <p class="result-bridge" role="status">${working?`正在建模 · ${Math.round(model.progress||0)}% · 任务已保存，请勿重复提交`:ready?(example?'当前为已生成实验模型，可直接继续试剪，不扣费。侧后方为模型推断。':'对应模型已保存，可继续试剪。侧后方为模型推断。'):'按本次融合图生成真实网格。首次创建预计40 API积分；恢复查询与载入已有模型不会创建新任务。'}</p>
      ${model.error?`<p class="result-boundary" role="alert">${escapeHtml(model.error)}</p>`:''}
      ${model.warning||model.persistenceWarning?`<p class="result-boundary" role="status">${escapeHtml(model.warning||model.persistenceWarning)}</p>`:''}
      <p class="result-boundary">试剪修改重建头发网格，尚不代表逐根发丝模拟，也不会同步修改上方图片。</p>
    </div>`;
  root.querySelector('#action-enter-3d').addEventListener('click', () => {
    if(ready)return sessionStore.setScreen('3d');
    if(model.id)return sessionStore.refreshReconstruction();
    return sessionStore.startReconstruction();
  });
  root.querySelector('#action-model-example').addEventListener('click',()=>sessionStore.loadReconstructionExample());
  root.querySelector('#action-regenerate').addEventListener('click', () => sessionStore.triggerGenerate());
  root.querySelector('#action-replace').addEventListener('click', () => sessionStore.clearOldResultAndReplace());
  const timer=working&&model.id?setInterval(()=>{if(!document.hidden)sessionStore.refreshReconstruction();},3500):null;
  return {teardown(){clearInterval(timer);}};
}

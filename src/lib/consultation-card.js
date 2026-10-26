import { escapeHtml } from './html.js';

const zones = { front:'前额刘海', left:'左侧鬓区', right:'右侧鬓区', crown:'顶部发冠', back:'后脑枕区' };
export function consultationNotes(sections) {
  return Object.entries(zones).map(([key,label]) => {
    const remaining = Number.isFinite(sections[key]) ? Math.max(0,Math.min(100,Math.round(sections[key]))) : 100;
    return remaining === 100 ? `${label} · 虚拟模型未调整` : `${label} · 虚拟发段减少约 ${100-remaining}%`;
  });
}

function loadImage(src) {
  return new Promise((resolve,reject) => {
    const image=new Image();
    image.crossOrigin='anonymous';
    image.onload=()=>resolve(image);
    image.onerror=()=>reject(new Error('参考图片暂时无法读取，请返回预览重新加载后再保存'));
    image.src=src;
  });
}
function contain(ctx, image, x, y, w, h) {
  const scale=Math.min(w/image.width,h/image.height);
  const iw=image.width*scale, ih=image.height*scale;
  ctx.drawImage(image,x+(w-iw)/2,y+(h-ih)/2,iw,ih);
}

export async function createConsultationCard({ reference, snapshot, sections, demo, archetype,reconstructed=false,bundleHair=false,cutCounts=null }) {
  const [target, model]=await Promise.all([loadImage(reference),loadImage(snapshot)]);
  const canvas=document.createElement('canvas');
  canvas.width=1440; canvas.height=1600;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#f4f0e8'; ctx.fillRect(0,0,1440,1600);
  ctx.fillStyle='#668a7c'; ctx.font='20px sans-serif'; ctx.fillText('HAIRFIT / BEFORE THE CHAIR',64,74);
  ctx.fillStyle='#171a18'; ctx.font='48px sans-serif'; ctx.fillText('和理发师一起，确认下一种样子。',64,154);
  ctx.font='22px sans-serif'; ctx.fillStyle='#5a635e';
  ctx.fillText(demo ? '已生成示例 · 本次没有发起模型调用' : '我的造型参考 · 由使用者选择和调整',64,204);
  ctx.fillStyle='#fffdf8';ctx.fillRect(64,250,640,700);
  ctx.fillStyle='#101613';ctx.fillRect(736,250,640,700);
  contain(ctx,target,80,268,608,620);
  // Crop the wide stage to its central square so the haircut remains legible on the card.
  const side = Math.min(model.width, model.height);
  ctx.drawImage(model, (model.width-side)/2, (model.height-side)/2, side, side, 752, 268, 608, 620);
  ctx.fillStyle='#171a18';ctx.font='24px sans-serif';ctx.fillText('AI 换发参考',88,926);
  ctx.fillStyle='#f4f0e8';ctx.fillText('3D 虚拟试剪示意',760,926);
  ctx.fillStyle='#b46a45';ctx.font='22px sans-serif';ctx.fillText('我的调整意向 / '+archetype,64,1016);
  ctx.fillStyle='#171a18';ctx.font='26px sans-serif';
  const notes=cutCounts?Object.entries(zones).map(([key,label])=>`${label} · 已试剪 ${cutCounts[key]||0} 次`):consultationNotes(sections);
  notes.forEach((line,i)=>ctx.fillText(line,64,1080+i*52));
  ctx.fillStyle='#5a635e';ctx.font='22px sans-serif';
  const footer=[
    reconstructed?'操作次数仅记录虚拟剪切，不表示实际头发长度。':'百分比仅表示虚拟模型发段相对初始值的变化，实际长度请现场确认。',
    reconstructed?(bundleHair?'发束沿重建轮廓生成，发根与走向为近似；摆动和掉落为基础模拟。':'3D 编辑照片重建的头发网格，侧后方为推断；不模拟逐根发丝。'):'3D 使用预设几何和照片外观参考，试剪尚未同步回上方 AI 图片。',
    'AI 预览可能改变五官，发质、发量和实际造型请与理发师共同评估。'
  ];
  footer.forEach((line,i)=>ctx.fillText(line,64,1414+i*40));
  ctx.font='18px sans-serif';ctx.fillText('Created '+new Date().toLocaleDateString('zh-CN'),64,1550);
  return canvas.toDataURL('image/png');
}

export function showConsultationCard(root, dataUrl) {
  root.querySelector('.consultation-overlay')?.remove();
  const dialog=document.createElement('dialog');
  dialog.className='consultation-overlay';
  dialog.innerHTML=`<div class="consultation-head"><h3>带着参考去理发</h3><button type="button" class="btn-outline" id="close-card">关闭</button></div><img class="consultation-image" src="${escapeHtml(dataUrl)}" alt="理发沟通卡，含换发参考、虚拟试剪示意与分区调整意向" /><a class="btn-primary" href="${escapeHtml(dataUrl)}" download="HairFit-consultation.png">保存 PNG 图片</a>`;
  root.append(dialog);
  dialog.querySelector('#close-card').addEventListener('click',()=>{dialog.close();dialog.remove();});
  dialog.showModal();
}

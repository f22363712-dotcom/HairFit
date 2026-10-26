import {analyzePortraitImage} from './portrait-loader.js';
export function portraitCrop(points,width,height){
 if(!points?.[454])throw Error('请使用清晰正面人像');
 const left=points[234].x,right=points[454].x,top=points[10].y,chin=points[152].y;
 const w=right-left,h=chin-top;if(w<.10||h<.12)throw Error('人脸区域过小，请使用清晰正面照');
 const x=Math.max(0,left-w*.38),y=Math.max(0,top-h*.85),r=Math.min(1,right+w*.38),b=Math.min(1,chin+h*.20);
 return {x:x*width,y:y*height,width:(r-x)*width,height:(b-y)*height};
}
export async function prepareReconstructionInput(source){
 const image=await new Promise((resolve,reject)=>{const i=new Image();i.crossOrigin='anonymous';const timer=setTimeout(()=>reject(Error('融合图加载超时，请返回预览确认图片')),30000);i.onload=()=>{clearTimeout(timer);resolve(i);};i.onerror=()=>{clearTimeout(timer);reject(Error('无法读取融合图，请重新载入图片'));};i.src=source;});
 const task=analyzePortraitImage(image),{landmarks}=await task.promise;
 const crop=portraitCrop(landmarks,image.naturalWidth,image.naturalHeight);
 const ratio=Math.min(1,1024/Math.max(crop.width,crop.height)),canvas=document.createElement('canvas');
 canvas.width=Math.max(128,Math.round(crop.width*ratio));canvas.height=Math.max(128,Math.round(crop.height*ratio));
 const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.drawImage(image,crop.x,crop.y,crop.width,crop.height,0,0,canvas.width,canvas.height);
 return {dataUrl:canvas.toDataURL('image/jpeg',.95)};
}

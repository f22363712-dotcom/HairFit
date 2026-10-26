/** One image, one local worker. No webcam or remote inference. */
export function analyzePortraitImage(image,{timeoutMs=30000}={}){
  const worker=new Worker(new URL('../workers/portrait.worker.js',import.meta.url));
  let finish,timer,settled=false;
  const promise=new Promise((resolve,reject)=>{
    finish=(error,value)=>{if(settled)return;settled=true;clearTimeout(timer);worker.terminate();error?reject(error):resolve(value);};
    worker.onmessage=({data})=>finish(data.error?new Error(data.error):null,data);
    worker.onerror=()=>finish(new Error('本地人脸分析未能启动'));
    timer=setTimeout(()=>finish(new Error('本地人脸分析超时')),timeoutMs);
    createImageBitmap(image).then(bitmap=>{if(settled){bitmap.close();return;}worker.postMessage({image:bitmap},[bitmap]);}).catch(error=>finish(error));
  });
  return {promise,cancel:()=>finish(new Error('Portrait analysis cancelled'))};
}

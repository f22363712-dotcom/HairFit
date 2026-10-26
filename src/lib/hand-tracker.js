import {HandRuntime} from './hand-runtime.js';
/** Owns the local inference worker and backpressure. It never uploads video. */
export class HandTracker{
  constructor({workerFactory=()=>new Worker(new URL('../workers/hand-tracker.worker.js',import.meta.url)),
    createBitmap=(video)=>createImageBitmap(video,{resizeWidth:320}),onResult=()=>{},onState=()=>{},intervalMs=33,initTimeoutMs=30000,frameTimeoutMs=5000,
    now=()=>performance.now(),maxResultAgeMs=250}={}){
    Object.assign(this,{workerFactory,createBitmap,onResult,onState,intervalMs,initTimeoutMs,frameTimeoutMs,now,maxResultAgeMs});
    this.runtime=new HandRuntime({maxAgeMs:maxResultAgeMs});
    this.epoch=0;this.status='idle';this.worker=null;this.busy=false;this.stats={samples:0,meanInferenceMs:0};
  }
  start(){
    this.stop();const epoch=this.epoch;this.status='loading';this.message='正在加载本地手部模型';this.onState(this);
    return new Promise(resolve=>{
      this.resolveStart=resolve;
      this.initTimer=setTimeout(()=>this.fail('手部模型加载超时，可继续用鼠标试剪'),this.initTimeoutMs);
      try{
        const worker=this.workerFactory();this.worker=worker;
        worker.onmessage=({data})=>{
          if(epoch!==this.epoch)return;
          if(data.type==='ready'){
            clearTimeout(this.initTimer);this.status='ready';this.warmup=data;
            this.resolveStart=null;resolve(true);this.onState(this);
          }else if(data.type==='result'&&this.status==='ready'){
            clearTimeout(this.frameTimer);this.busy=false;
            this.stats.samples++;
            this.stats.meanInferenceMs+=(data.inferenceMs-this.stats.meanInferenceMs)/this.stats.samples;
            const receivedAt=this.now(),pending=this.pendingFrame?.timestamp===data.timestamp?this.pendingFrame:null;
            const age=receivedAt-data.timestamp;
            const stale=!Number.isFinite(age)||age<0||age>this.maxResultAgeMs;
            const roundTrip=pending?receivedAt-pending.dispatchAt:null;
            const measured={...data,latencyMs:age,detectedHand:!!data.hand,stale,frameId:pending?.frameId??null,
              timings:{bitmapMs:pending?pending.dispatchAt-pending.captureAt:null,workerRoundTripMs:roundTrip,
                deliveryMs:roundTrip!==null&&Number.isFinite(data.inferenceMs)?Math.max(0,roundTrip-data.inferenceMs):null}};
            this.pendingFrame=null;
            measured.runtime=this.runtime.observe(measured,receivedAt);
            this.onResult(stale?{...measured,hand:null,stale:true}:measured);
          }else if(data.type==='error')this.fail(data.message||'本地手部识别不可用');
        };
        worker.onerror=()=>{if(epoch===this.epoch)this.fail('手部识别未能启动，请刷新后重试');};
        worker.onmessageerror=()=>{if(epoch===this.epoch)this.fail('手部识别数据不可用，请重试');};
        worker.postMessage({type:'init'});
      }catch{this.fail('当前浏览器无法启动手部识别，可继续用鼠标试剪');}
    });
  }
  async infer(video,timestamp){
    if(this.status!=='ready'||this.busy||video.readyState<2||!video.videoWidth||video.currentTime===this.lastVideoTime||timestamp-this.lastSubmitted<this.intervalMs)return false;
    const epoch=this.epoch,captureAt=this.now();this.busy=true;this.lastSubmitted=timestamp;this.lastVideoTime=video.currentTime;
    // rAF timestamps describe the display frame and can precede this callback by
    // hundreds of milliseconds under WebGL load. Date the newly acquired image now.
    const imageTimestamp=captureAt;
    let image;
    try{
      image=await this.createBitmap(video);
      if(epoch!==this.epoch){image.close();return false;}
      this.pendingFrame={timestamp:imageTimestamp,captureAt,dispatchAt:this.now(),frameId:++this.frameId};
      this.frameTimer=setTimeout(()=>this.fail('手部识别暂停，请关闭摄像头后重试'),this.frameTimeoutMs);
      this.worker.postMessage({type:'frame',image,timestamp:imageTimestamp,aspect:video.videoWidth/video.videoHeight},[image]);
      return true;
    }catch{image?.close();if(epoch===this.epoch)this.fail('无法读取摄像头画面，可继续用鼠标试剪');return false;}
  }
  fail(message){this.stop();this.status='error';this.message=message;this.onState(this);}
  stop(){
    this.epoch++;clearTimeout(this.initTimer);clearTimeout(this.frameTimer);
    this.resolveStart?.(false);this.resolveStart=null;
    this.worker?.terminate();this.worker=null;this.busy=false;
    this.status='idle';this.lastVideoTime=-1;this.lastSubmitted=-Infinity;
    this.pendingFrame=null;this.frameId=0;
    this.runtime.reset();
    this.stats={samples:0,meanInferenceMs:0};this.onState(this);
  }
}

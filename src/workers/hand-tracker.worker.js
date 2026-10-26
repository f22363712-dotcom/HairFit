/* Classic worker: MediaPipe's local WASM loader uses importScripts. */
let detector=null;
self.onmessage=async({data})=>{
  if(data.type==='init'){
    try{
      importScripts('/vendor/mediapipe/vision_bundle.js');
      const simd=await Vision.FilesetResolver.isSimdSupported();
      const stem=simd?'vision_wasm_internal':'vision_wasm_nosimd_internal';
      const files={
        wasmLoaderPath:`/vendor/mediapipe/${stem}.js`,
        wasmBinaryPath:`/vendor/mediapipe/${stem}.wasm`
      };
      const delegates=data.delegate==='CPU'?['CPU']:['GPU','CPU'];
      let lastError;
      for(const delegate of delegates){
        try{
          detector=await Vision.HandLandmarker.createFromOptions(files,{
            baseOptions:{modelAssetPath:'/models/hand_landmarker.task',delegate},
            runningMode:'VIDEO',numHands:1,
            minHandDetectionConfidence:.65,minHandPresenceConfidence:.65,minTrackingConfidence:.65,
            canvas:new OffscreenCanvas(320,240)
          });
          const blank=new OffscreenCanvas(64,64);
          const ctx=blank.getContext('2d');ctx.fillStyle='#808080';ctx.fillRect(0,0,64,64);
          const start=performance.now();
          const result=detector.detectForVideo(blank,0);
          self.postMessage({type:'ready',delegate,warmupMs:performance.now()-start,warmupHands:result.landmarks.length});
          return;
        }catch(error){lastError=error;detector?.close();detector=null;}
      }
      throw lastError;
    }catch(error){self.postMessage({type:'error',message:error.message||'本地手部模型加载失败'});}
    return;
  }
  if(data.type==='frame'){
    try{
      if(!detector)throw new Error('手部模型尚未就绪');
      const start=performance.now();
      // detectForVideo includes image upload and graph synchronization as well as inference.
      const result=detector.detectForVideo(data.image,data.timestamp);
      const category=(result.handedness||result.handednesses)?.[0]?.[0];
      const hand=result.landmarks[0]?{
        landmarks:result.landmarks[0],worldLandmarks:result.worldLandmarks[0],
        handedness:category?.categoryName||'unknown',aspect:data.aspect
      }:null;
      self.postMessage({type:'result',hand,timestamp:data.timestamp,inferenceMs:performance.now()-start});
    }catch(error){self.postMessage({type:'error',message:error.message||'手部识别失败'});}
    finally{data.image?.close();}
  }
};

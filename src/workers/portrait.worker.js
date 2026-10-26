self.onmessage=async({data})=>{
  let model;
  try{
    importScripts('/vendor/mediapipe/vision_bundle.js');
    const simd=await Vision.FilesetResolver.isSimdSupported(),stem=simd?'vision_wasm_internal':'vision_wasm_nosimd_internal';
    model=await Vision.FaceLandmarker.createFromOptions({wasmLoaderPath:`/vendor/mediapipe/${stem}.js`,wasmBinaryPath:`/vendor/mediapipe/${stem}.wasm`},{baseOptions:{modelAssetPath:'/models/face_landmarker.task',delegate:'CPU'},runningMode:'IMAGE',numFaces:1});
    const result=model.detect(data.image);
    const edges=Vision.FaceLandmarker.FACE_LANDMARKS_TESSELATION;
    const triangles=[];
    for(let i=0;i+2<edges.length;i+=3)triangles.push(edges[i].start,edges[i].end,edges[i+1].end);
    self.postMessage({landmarks:result.faceLandmarks[0]||[],triangles});
  }catch(error){self.postMessage({error:error.message||'本地人脸分析失败'});}
  finally{data.image?.close();model?.close();}
};

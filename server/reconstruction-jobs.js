import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {createTripoClient} from './tripo-generation.js';

const MAX_IMAGE=8*1024*1024;
const MAX_MODEL=150*1024*1024;
const validId=id=>typeof id==='string'&&/^[a-f0-9]{64}$/.test(id);
function inputImage(value){
 if(typeof value!=='string'||value.length>Math.ceil(MAX_IMAGE/3)*4+100)throw new Error('需要8MB以内PNG或JPEG图片');
 const match=/^data:image\/(png|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
 if(!match||match[2].length%4!==0)throw new Error('需要有效PNG或JPEG data URL');
 const bytes=Buffer.from(match[2],'base64');
 const png=bytes.length>=33&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))&&bytes.toString('ascii',12,16)==='IHDR';
 const jpeg=bytes.length>=4&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255&&bytes.at(-2)===255&&bytes.at(-1)===217;
 if(!bytes.length||bytes.length>MAX_IMAGE||bytes.toString('base64')!==match[2]||!(match[1]==='png'?png:jpeg))throw new Error('图片内容与PNG或JPEG格式不符');
 if(png&&(bytes.readUInt32BE(16)<1||bytes.readUInt32BE(20)<1||bytes.readUInt32BE(16)>16384||bytes.readUInt32BE(20)>16384))throw new Error('图片尺寸无效');
 return {bytes,extension:match[1]==='png'?'png':'jpg'};
}
function validGlb(bytes){return bytes.length>=12&&bytes.length<=MAX_MODEL&&bytes.toString('ascii',0,4)==='glTF'&&bytes.readUInt32LE(4)===2&&bytes.readUInt32LE(8)===bytes.length;}

// Private records contain provider identifiers. Only publicJob crosses the HTTP boundary.
export function createReconstructionJobs({stateDir=path.resolve('logs/reconstruction'),exampleDir=path.resolve('test-assets/tripo-proof'),client=createTripoClient(),fetchImpl=globalThis.fetch,now=Date.now}={}){
 const active=new Map();
 const directory=id=>path.join(stateDir,id);
 const recordPath=id=>path.join(directory(id),'job.json');
 async function save(job){const target=recordPath(job.id);await fs.writeFile(target+'.tmp',JSON.stringify(job,null,2),{mode:0o600});await fs.rename(target+'.tmp',target);}
 async function load(id){try{return JSON.parse(await fs.readFile(recordPath(id),'utf8'));}catch(e){if(e.code==='ENOENT')return null;throw e;}}
 function publicJob(job){return {id:job.id,status:job.status,progress:job.progress??0,modelUrl:job.status==='ready'?`/api/reconstruction/${job.id}/model`:null,sourceUrl:`/api/reconstruction/${job.id}/source`,error:job.error??null,creditsConsumed:job.creditsConsumed??'unknown',...(job.warning?{warning:job.warning}:{}),...(job.source?{source:job.source}:{}),...(job.hairPart?{hairPart:job.hairPart}:{})};}
 function accountingWarning(job,result){if(result?.usage?.logSaved===false)job.warning='用量日志未能落盘，请保留本次任务记录并核对账户用量，勿重复创建';}
 function exclusive(id,action){if(active.has(id))return active.get(id);const work=Promise.resolve().then(action).finally(()=>active.delete(id));active.set(id,work);return work;}
 async function example(){try{await fs.access(path.join(exampleDir,'model.glb'));const sourceFile=await fs.access(path.join(exampleDir,'input-opaque-next.png')).then(()=> 'input-opaque-next.png').catch(()=> 'input.png');await fs.access(path.join(exampleDir,sourceFile));return {id:'example',status:'ready',progress:100,creditsConsumed:0,hairPart:'tripo_part_0',source:'example',sourceFile};}catch{return null;}}
 async function recover(job){
  if(!job.taskId&&['reserved','uploading','submitting'].includes(job.status)){job.status='ambiguous';job.error='上次创建中断，需核对平台任务历史，禁止重复提交';await save(job);}
  if(job.status==='downloading'){job.status='failed';job.error='模型下载中断，已保留任务记录，未重新创建';await save(job);}
  return job;
 }
 async function download(job,url){
  job.status='downloading';job.progress=99;await save(job);
  try{
   const parsed=new URL(url);if(parsed.protocol!=='https:'||parsed.username||parsed.password)throw Error('invalid model URL');
   const response=await fetchImpl(parsed.href,{redirect:'error',signal:AbortSignal.timeout(120000)});
   if(!response.ok||Number(response.headers.get('content-length'))>MAX_MODEL||!response.body)throw Error('invalid model response');
   const chunks=[];let length=0;
   for await(const chunk of response.body){length+=chunk.length;if(length>MAX_MODEL)throw Error('model too large');chunks.push(chunk);}
   const bytes=Buffer.concat(chunks);if(!validGlb(bytes))throw Error('invalid GLB');
   await fs.writeFile(path.join(directory(job.id),'model.glb.tmp'),bytes,{mode:0o600});await fs.rename(path.join(directory(job.id),'model.glb.tmp'),path.join(directory(job.id),'model.glb'));
   job.status='ready';job.progress=100;job.error=null;
  }catch{job.status='failed';job.error='模型下载或GLB校验失败，已保留任务记录，未重新创建';}
  await save(job);
 }
 return {
  async create(imageDataUrl){
   const {bytes,extension}=inputImage(imageDataUrl);const id=crypto.createHash('sha256').update(bytes).digest('hex');
   return exclusive(id,async()=>{
    const existing=await load(id);if(existing)return publicJob(await recover(existing));
    await fs.mkdir(stateDir,{recursive:true});
    try{await fs.mkdir(directory(id),{mode:0o700});}catch(e){if(e.code!=='EEXIST')throw e;const saved=await load(id);return publicJob(saved?await recover(saved):{id,status:'ambiguous',error:'创建记录正由其他进程保留，请稍后查询，禁止重复提交'});}
    const job={id,status:'reserved',progress:0,extension,createdAt:now(),creditsConsumed:'unknown'};
    await save(job);await fs.writeFile(path.join(directory(id),'source.'+extension),bytes,{mode:0o600,flag:'wx'});
    try{
     job.status='uploading';await save(job);const uploaded=await client.upload(bytes,'portrait.'+extension);
     accountingWarning(job,uploaded);job.fileToken=uploaded.file_token;job.status='submitting';await save(job);
     const result=await client.submit(job.fileToken);accountingWarning(job,result);job.taskId=result.task_id;job.status='pending';job.progress=0;
     if(!job.taskId)throw Error('missing task id');
     // This save must succeed before any query can happen. A lost response stays ambiguous.
     await save(job);
    }catch(error){accountingWarning(job,error);job.status='ambiguous';job.error='创建结果不确定，需核对平台任务历史，禁止重复提交';await save(job);}
    return publicJob(job);
   });
  },
  async get(id){
   if(id==='example'){const job=await example();return job?publicJob(job):null;}
   if(!validId(id))return null;
   return exclusive(id,async()=>{
    let job=await load(id);if(!job)return null;job=await recover(job);
    if(!job.taskId||['ready','failed','ambiguous'].includes(job.status))return publicJob(job);
    if(job.lastCheckedAt!=null&&now()-job.lastCheckedAt<10000)return publicJob(job);
    job.lastCheckedAt=now();await save(job);
    let result;
    try{result=await client.query(job.taskId);}catch(error){accountingWarning(job,error);job.error='状态查询暂时失败，已保留原任务，请稍后查询';await save(job);return publicJob(job);}
    accountingWarning(job,result);job.error=null;job.creditsConsumed=result.credits_consumed??job.creditsConsumed;job.progress=Math.max(0,Math.min(99,Number(result.progress)||0));
    if(result.status==='success'){
     // Only a URL obtained from the saved provider task is downloaded, never request input.
     await download(job,result.output?.model_url);
    }else if(['failed','cancelled','canceled','banned','expired'].includes(result.status)){job.status='failed';job.error='供应商重建任务失败，未重新创建';await save(job);}
    else{job.status='processing';await save(job);}
    return publicJob(job);
   });
  },
  async artifact(id,kind){
   if(!['model','source'].includes(kind))return null;
   let target,type;
   if(id==='example'){const sample=await example();if(!sample)return null;target=path.join(exampleDir,kind==='model'?'model.glb':sample.sourceFile);type=kind==='model'?'model/gltf-binary':'image/png';}
   else{
    if(!validId(id))return null;const job=await load(id);if(!job||kind==='model'&&job.status!=='ready')return null;
    if(!['png','jpg'].includes(job.extension))return null;
    target=path.join(directory(id),kind==='model'?'model.glb':'source.'+job.extension);type=kind==='model'?'model/gltf-binary':job.extension==='png'?'image/png':'image/jpeg';
   }
   try{await fs.access(target);return {path:target,type};}catch{return null;}
  }
 };
}

// Explicit experiment runner. Query/download never create another paid task.
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {createTripoClient,TRIPO_MODEL} from '../server/tripo-generation.js';
dotenv.config({path:process.env.TRIPO_ENV_FILE||'.env',quiet:true});
const client=createTripoClient({apiKey:process.env.TRIPO_API_KEY||process.env.Tripo_API_KEY,region:'cn'});
const checkpoint=path.resolve('logs/tripo-proof-20261027.json');
const directory=path.resolve('test-assets/tripo-proof');
const [operation,input]=process.argv.slice(2);
let job;
async function save(){await fs.writeFile(checkpoint+'.tmp',JSON.stringify(job,null,2));await fs.rename(checkpoint+'.tmp',checkpoint);}
try{
  if(operation==='submit'){
    if(!input)throw Error('Usage: submit <PNG/JPEG file>');
    const bytes=await fs.readFile(input);
    const balance=await client.balance();
    if(balance.balance<40)throw Error('API余额不足40积分，未创建任务');
    job={createdAt:new Date().toISOString(),region:'cn',model:TRIPO_MODEL,status:'reserved',sourceHash:crypto.createHash('sha256').update(bytes).digest('hex'),budgetCredits:40,balanceBefore:balance.balance};
    await fs.mkdir(path.dirname(checkpoint),{recursive:true});
    await fs.writeFile(checkpoint,JSON.stringify(job,null,2),{flag:'wx'});
    await fs.mkdir(directory,{recursive:true});await fs.writeFile(path.join(directory,'input'+path.extname(input)),bytes);
    const uploaded=await client.upload(bytes,path.basename(input));job.fileToken=uploaded.file_token;job.status='submitting';await save();
    const result=await client.submit(job.fileToken);job.taskId=result.task_id;job.submitUsage=result.usage;job.status='submitted';await save();
    console.log(JSON.stringify({taskId:job.taskId,status:job.status,balanceBefore:job.balanceBefore,budgetCredits:40}));
  }else if(operation==='query'){
    job=JSON.parse(await fs.readFile(checkpoint,'utf8'));
    if(!job.taskId)throw Error('没有已保存的taskId，请先核对平台历史，勿重复提交');
    const result=await client.query(job.taskId);job.result=result;job.status=result.status;job.lastCheckedAt=new Date().toISOString();await save();
    console.log(JSON.stringify({taskId:job.taskId,status:job.status,progress:result.progress,creditsConsumed:result.credits_consumed??'unknown',outputKeys:Object.keys(result.output||{}),errorCode:result.error_code??null}));
  }else if(operation==='download'){
    job=JSON.parse(await fs.readFile(checkpoint,'utf8'));
    if(job.status!=='success')throw Error('任务尚未成功，未下载');
    const url=job.result?.output?.model_url;
    if(!url||new URL(url).protocol!=='https:')throw Error('未返回HTTPS模型地址');
    const response=await fetch(url,{signal:AbortSignal.timeout(120000)});
    if(!response.ok)throw Error(`模型下载HTTP ${response.status}`);
    const chunks=[];let total=0;
    for await(const chunk of response.body){total+=chunk.length;if(total>150*1024*1024)throw Error('模型超过150MB，停止下载');chunks.push(chunk);}
    const bytes=Buffer.concat(chunks);
    if(bytes.length<12||bytes.toString('ascii',0,4)!=='glTF'||bytes.readUInt32LE(4)!==2||bytes.readUInt32LE(8)!==bytes.length)throw Error('返回文件不是有效GLB2');
    await fs.mkdir(directory,{recursive:true});const target=path.join(directory,'model.glb');await fs.writeFile(target,bytes,{flag:'wx'});
    job.localModel=target;job.modelBytes=bytes.length;job.modelHash=crypto.createHash('sha256').update(bytes).digest('hex');await save();
    console.log(JSON.stringify({localModel:target,bytes:bytes.length,sha256:job.modelHash}));
  }else throw Error('Use submit, query, or download');
}catch(error){
  // A reserved checkpoint blocks a second submit even if the response was lost.
  if(job&&operation==='submit'&&error.code!=='EEXIST'){job.error=error.message;try{await save();}catch{}}
  console.error(JSON.stringify({error:error.code==='EEXIST'?'已有实验记录，禁止重复提交，请查询现有任务':error.message,taskId:job?.taskId||null}));process.exitCode=1;
}

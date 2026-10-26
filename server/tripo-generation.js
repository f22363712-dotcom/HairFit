import fs from 'node:fs/promises';
import path from 'node:path';

export const TRIPO_MODEL='v3.1-20260211';
const validId=value=>typeof value==='string'&&/^[\w-]{1,128}$/.test(value);
async function saveUsage(record){
  const target=path.resolve('logs/model-usage.jsonl');
  await fs.mkdir(path.dirname(target),{recursive:true});await fs.appendFile(target,JSON.stringify(record)+'\n');
}

export function createTripoClient({apiKey=process.env.TRIPO_API_KEY,region=process.env.TRIPO_REGION||'global',fetchImpl=globalThis.fetch,log=saveUsage,now=Date.now,timeoutMs=45000}={}){
  if(!['cn','global'].includes(region))throw new Error('Invalid Tripo region; use cn or global');
  const endpoint=region==='cn'?'https://openapi.tripo3d.com/v3':'https://openapi.tripo3d.ai/v3';
  async function request(operation,route,body){
    if(!apiKey)throw new Error('请先在本机 .env 配置 TRIPO_API_KEY');
    const started=now();let result,failure,httpStatus=null,code=null;
    try{
      const multipart=body instanceof FormData;
      const response=await fetchImpl(endpoint+route,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${apiKey}`,...(body&&!multipart?{'Content-Type':'application/json'}:{})},body:body?(multipart?body:JSON.stringify(body)):undefined,signal:AbortSignal.timeout(timeoutMs)});
      httpStatus=response.status;const raw=await response.text();let parsed;
      try{parsed=JSON.parse(raw);}catch{throw new Error(`Tripo HTTP ${httpStatus}，返回内容无法解析；请勿重复创建任务`);}
      code=Number.isInteger(parsed?.code)?parsed.code:null;
      if(!response.ok||code!==0)throw new Error(`Tripo HTTP ${httpStatus}，服务代码 ${code??'unknown'}`);
      if(!parsed.data||typeof parsed.data!=='object')throw new Error('Tripo 返回缺少任务数据，请勿重复创建任务');
      result=parsed.data;
    }catch(error){failure=error.name==='AbortError'||error.name==='TimeoutError'?new Error('Tripo 请求超时，提交结果不确定，请先核对任务历史，勿重复创建'):new Error(error.message.includes('Tripo')?error.message:'Tripo 网络连接失败，提交结果不确定，请勿重复创建');}
    const record={time:new Date(now()).toISOString(),provider:'Tripo direct V3',region,model:TRIPO_MODEL,operation,taskId:result?.task_id??null,httpStatus,code,
      latencyMs:now()-started,success:!failure,inputTokens:'unknown',outputTokens:'unknown',totalTokens:'unknown',cacheHit:'unknown',cachedInputTokens:'unknown',
      creditsConsumed:result?.credits_consumed??'unknown',creditsAccounting:'per-task snapshot; never sum repeated queries',taskStatus:result?.status??'unknown',logSaved:true};
    try{await log(record);}catch{record.logSaved=false;record.logWarning='用量日志未能落盘，请保留本次任务编号和账户用量';}
    if(failure){failure.usage=record;throw failure;}
    return {...result,usage:record};
  }
  return {
    async upload(bytes,name){
      if(!bytes?.length||bytes.length>20*1024*1024||!/^.+\.(png|jpe?g)$/i.test(name))throw new Error('Tripo 输入需要20MB以内的PNG或JPEG');
      const data=new FormData();data.append('file',new Blob([bytes],{type:/\.png$/i.test(name)?'image/png':'image/jpeg'}),path.basename(name));
      const result=await request('upload','/files',data);
      if(!validId(result.file_token))throw new Error('Tripo 上传未返回有效 file_token');return result;
    },
    async submit(input){
      if(typeof input!=='string'||!(validId(input)||/^https:\/\//.test(input)))throw new Error('需要图片file_token或HTTPS图片地址');
      const result=await request('submit','/generation/image-to-model',{input,model:TRIPO_MODEL,texture:false,pbr:false,generate_parts:true,face_limit:100000,geometry_quality:'standard',model_seed:42});
      if(!validId(result.task_id))throw new Error('Tripo 提交未返回有效 task_id，请核对平台任务历史，勿重复提交');return result;
    },
    query(taskId){if(!validId(taskId))return Promise.reject(new Error('无效 task_id'));return request('query',`/tasks/${encodeURIComponent(taskId)}`);},
    balance(){return request('balance','/account/balance');}
  };
}

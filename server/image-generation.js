import fs from 'node:fs/promises';
import path from 'node:path';

const usagePath = path.resolve('logs/model-usage.jsonl');
const model = process.env.DASHSCOPE_IMAGE_MODEL || 'qwen-image-3.0-pro';
const nativeImagePath='/api/v1/services/aigc/multimodal-generation/generation';
export function resolveImageGenerationEndpoint(configured) {
  const value=configured||`https://dashscope.aliyuncs.com${nativeImagePath}`;
  const url=new URL(value);
  const aliyun=url.hostname==='dashscope.aliyuncs.com'||url.hostname.endsWith('.maas.aliyuncs.com');
  if(aliyun&&/^\/(compatible-mode\/v1|api\/v1)\/?$/.test(url.pathname)){
    url.pathname=nativeImagePath;
    return url.toString();
  }
  return value;
}
const endpoint = resolveImageGenerationEndpoint(process.env.DASHSCOPE_BASE_URL);
async function logUsage(record) {
  await fs.mkdir(path.dirname(usagePath), { recursive: true });
  await fs.appendFile(usagePath, JSON.stringify(record) + '\n', 'utf8');
}

export async function generatePreview({ personalImage, hairstyleImage }) {
  if (!process.env.DASHSCOPE_API_KEY) throw new Error('未配置 DASHSCOPE_API_KEY，请从 .env.example 创建 .env');
  if (!personalImage?.dataUrl || !hairstyleImage?.dataUrl) throw new Error('需要个人照片和理想发型图片');
  const started = Date.now();
  let usage = {};
  let success = false;
  let outcome = 'network_error';
  let httpStatus=null,responseFormat=null,responseBytes=null;
  let record,failure;
  const prompt = 'Image 1 is the person. Image 2 is the desired hairstyle. Create a natural hairstyle preview on the person, preserving the person’s face, pose, skin tone, lighting, clothing and background while changing only the hair to match image 2. Do not change facial features or beautify the face.';
  const payload = {
    model,
    input: { messages: [{ role: 'user', content: [
      { image: personalImage.dataUrl }, { image: hairstyleImage.dataUrl }, { text: prompt }
    ] }] },
    parameters: { size: '1024*1024', n: 1 }
  };
  let image;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(300_000)
    });
    httpStatus=response.status;
    outcome = `http_${response.status}`;
    const raw=await response.text();
    responseBytes=Buffer.byteLength(raw);
    let body=null;
    responseFormat=raw.trim()?'non-json':'empty';
    if(raw.trim()){
      try{body=JSON.parse(raw);responseFormat='json';}catch{/* Preserve HTTP status without exposing upstream text. */}
    }
    usage = body?.usage || {};
    if (!response.ok) {
      const code=body?.code||body?.error?.code;
      const detail=typeof code==='string'&&/^[A-Za-z][A-Za-z0-9_.-]{0,80}$/.test(code)?`，${code}`:'';
      const format=responseFormat==='empty'?'，响应为空':responseFormat==='non-json'?'，响应不是 JSON':'';
      throw new Error(`图像服务返回 HTTP ${response.status}${detail}${format}。请检查图像服务地址与模型配置，已保留输入图片。`);
    }
    if(responseFormat!=='json'){
      outcome=responseFormat==='empty'?'empty_response':'invalid_json_response';
      throw new Error(responseFormat==='empty'?'图像服务返回了空响应，未生成可用预览。已保留输入图片。':'图像服务返回的内容不是 JSON，未生成可用预览。已保留输入图片。');
    }
    image = body?.output?.choices?.[0]?.message?.content?.find(item => item.image)?.image
      || body?.data?.[0]?.url
      || (body?.data?.[0]?.b64_json ? `data:image/png;base64,${body.data[0].b64_json}` : null);
    if (!image || !/^(https?:\/\/|data:image\/(png|jpeg|webp);base64,)/.test(image)) {
      outcome = 'invalid_image_response';
      throw new Error('图像服务没有返回可用图片，请重试');
    }
    success = true;
    outcome = 'success';
  } catch (error) {
    failure=error.name==='TimeoutError'?new Error('生成等待已超过五分钟，请稍后重试。已保留输入图片'):error;
    throw failure;
  } finally {
    record = {
      time: new Date().toISOString(), model,
      inputTokens: usage.input_tokens ?? usage.prompt_tokens ?? 'unknown',
      outputTokens: usage.output_tokens ?? usage.completion_tokens ?? 'unknown',
      totalTokens: usage.total_tokens ?? 'unknown',
      inputImages: usage.input_image_count ?? 'unknown',
      outputImages: usage.output_image_count ?? 'unknown',
      cacheHit: usage.cache_hit ?? (usage.prompt_tokens_details?.cached_tokens != null ? usage.prompt_tokens_details.cached_tokens > 0 : 'unknown'),
      cachedInputTokens: usage.prompt_tokens_details?.cached_tokens ?? 'unknown',
      latencyMs: Date.now() - started, success, outcome,httpStatus,responseFormat,responseBytes,logSaved:true
    };
    try{await logUsage(record);}catch(error){
      record.logSaved=false;
      record.logWarning='本次用量未写入本地日志，记录已保留在本次响应中，请勿重复生成。';
      if(failure)failure.usage=record;
      console.warn('HairFit usage log could not be saved:',error.code||'unknown');
    }
  }
  return { image, usage: record };
}

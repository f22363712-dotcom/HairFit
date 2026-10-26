import 'dotenv/config';
import http from 'node:http';
import { URL } from 'node:url';
import { generatePreview } from './image-generation.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createReconstructionJobs} from './reconstruction-jobs.js';

const port = Number(process.env.PORT || 8787);
const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const reconstruction = createReconstructionJobs({stateDir:path.join(projectRoot,'logs/reconstruction'),exampleDir:path.join(projectRoot,'test-assets/tripo-proof')});
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.task': 'application/octet-stream',
  '.glb': 'model/gltf-binary'
};

function send(res, status, body, type='application/json') { res.writeHead(status, {'Content-Type': type, 'Cache-Control':'no-store'}); res.end(type.startsWith('application/json') ? JSON.stringify(body) : body); }
function readBody(req,limit=35_000_000) { return new Promise((resolve,reject)=>{ let data=''; let bytes=0; let rejected=false; req.on('data', c=>{ bytes += c.length; if(bytes > limit) { rejected=true;data='';reject(Object.assign(new Error('request too large'),{statusCode:413})); return; } if(!rejected)data += c; }); req.on('end',()=>{ if(rejected)return;try{ resolve(JSON.parse(data || '{}')); }catch(e){ reject(Object.assign(new Error('invalid json'),{statusCode:400})); } }); req.on('error',reject); }); }

// Only web assets are public. Project files and credentials never enter this route.
async function staticFile(urlPath) {
  const pathname = decodeURIComponent(urlPath);
  const route = pathname === '/' ? '/index.html' : pathname;
  if (route.split('/').some(part => part === '..' || part.startsWith('.')) || route.includes('\\')) return null;
  const roots = [
    ['/src/', 'src/'], ['/node_modules/three/', 'node_modules/three/'], ['/node_modules/three-mesh-bvh/', 'node_modules/three-mesh-bvh/'], ['/test-assets/', 'test-assets/'],
    ['/models/', 'public/models/'], ['/vendor/mediapipe/', 'public/vendor/mediapipe/'], ['/vendor/mesh-cut/', 'public/vendor/mesh-cut/']
  ];
  const mapping = roots.find(([prefix]) => route.startsWith(prefix));
  if (route !== '/index.html' && !mapping) return null;
  if (!mime[path.extname(route)]) return null;
  const allowedRoot = mapping ? await fs.realpath(path.join(projectRoot, mapping[1])) : projectRoot;
  const target = await fs.realpath(path.join(allowedRoot, mapping ? route.slice(mapping[0].length) : 'index.html'));
  const relative = path.relative(allowedRoot, target);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return target;
}

let latestResult = null;

const server = http.createServer(async (req,res)=>{
  try {
    const host = new URL(`http://${req.headers.host}`);
    if (!['localhost','127.0.0.1','[::1]'].includes(host.hostname)) return send(res,403,{error:'local host required'});
    const url = new URL(req.url, host);
    if (url.origin !== host.origin) return send(res,403,{error:'request host mismatch'});
    if (url.pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }
    if (url.pathname === '/api/health') return send(res, 200, {ok:true, model:process.env.DASHSCOPE_IMAGE_MODEL || 'unset'});
    if (url.pathname === '/api/latest-preview') return send(res, 200, latestResult || {empty:true});
    if (req.method === 'POST' && ['/api/reconstruction','/api/generate-preview'].includes(url.pathname)) {
      if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||'')) return send(res,415,{error:'application/json required'});
      if (req.headers.origin && req.headers.origin !== url.origin) return send(res,403,{error:'cross-origin request denied'});
    }
    if (url.pathname === '/api/reconstruction' && req.method === 'POST') {
      const input=await readBody(req,11_200_000);
      if (!process.env.TRIPO_API_KEY) return send(res,503,{error:'请先在本机 .env 配置 TRIPO_API_KEY'});
      try { return send(res,200,await reconstruction.create(input.imageDataUrl)); }
      catch(error) { return send(res,400,{error:'重建输入无效或记录无法保存，未授权自动重试'}); }
    }
    const reconstructionRoute=/^\/api\/reconstruction\/([^/]+)(?:\/(model|source))?$/.exec(url.pathname);
    if (reconstructionRoute) {
      if (!['GET','HEAD'].includes(req.method)) return send(res,405,{error:'method not allowed'});
      const [,id,kind]=reconstructionRoute;
      if (!kind) {
        const result=await reconstruction.get(id);
        return send(res,result?200:404,result||{error:'not found'});
      }
      const file=await reconstruction.artifact(id,kind);
      if (!file) return send(res,404,{error:'not found'});
      const body=await fs.readFile(file.path);
      res.writeHead(200,{'Content-Type':file.type,'Content-Length':body.length,'X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
      return res.end(req.method==='HEAD'?undefined:body);
    }
    if (url.pathname === '/api/generate-preview' && req.method === 'POST') {
      const input = await readBody(req);
      const result = await generatePreview(input);
      latestResult = result;
      return send(res, 200, result);
    }
    if (url.pathname.startsWith('/api/')) return send(res, 404, {error:'not found'});
    if (!['GET', 'HEAD'].includes(req.method)) return send(res, 405, { error: 'method not allowed' });
    const file = await staticFile(url.pathname);
    if (!file) return send(res, 404, { error: 'not found' });
    const body = await fs.readFile(file);
    res.writeHead(200, {'Content-Type':mime[path.extname(file)], 'X-Content-Type-Options': 'nosniff', 'Cache-Control':'no-store'});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof URIError) return send(res, 404, { error: 'not found' });
    send(res, error.statusCode||500, {error: error.message || 'server error',...(error.usage?{usage:error.usage}:{})});
  }
});
server.listen(port, '127.0.0.1', ()=>console.log(`HairFit running at http://localhost:${server.address().port}`));

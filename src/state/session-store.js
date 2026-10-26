import {prepareReconstructionInput} from '../lib/reconstruction-input.js';
const STORAGE_KEY = 'hairfit_session_v1';
const MODEL_STORAGE_KEY='hairfit_reconstruction_v1';
const idleModel=()=>({id:null,status:'idle',progress:0,error:''});

export class SessionStore {
  constructor() {
    this.state = {
      screen: 'upload', // 'upload' | 'generating' | 'result' | '3d'
      personalImage: null, // { name, type, dataUrl } (正面免冠照)
      personalSideImage: null, // { name, type, dataUrl } 可选侧面参考，目前不参与 3D 几何生成
      personalBackImage: null, // { name, type, dataUrl } 可选背面参考，目前不参与 3D 几何生成
      hairstyleImage: null, // { name, type, dataUrl }
      generatedImage: null, // { urlOrData, createdAt, label }
      generatedCandidates: [], // [{ id, urlOrData, label, badge }] 多张生成预览候选
      reconstruction:idleModel(),
      request: { status: 'idle', message: '' }, // 'idle' | 'loading' | 'success' | 'error'
      hairSections: { front: 100, left: 100, right: 100, crown: 100, back: 100 },
      fallingClumps: []
    };
    this.listeners = new Set();
    this.loadFromStorage();
  }

  loadFromStorage() {
    try{const model=JSON.parse(localStorage.getItem(MODEL_STORAGE_KEY)||'null');if(model?.id){this.state.reconstruction=model;this.state.generatedImage={urlOrData:model.sourceUrl,label:'已保存建模输入',source:'reconstruction-input'};this.state.screen=model.status==='ready'?'3d':'result';}}catch{/* Server job is authoritative if local metadata is unavailable. */}
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.generatedImage?.urlOrData) {
          const compact=this.state.reconstruction.id?this.state.reconstruction:null;
          this.state.generatedImage = compact&&parsed.reconstruction?.id!==compact.id?{urlOrData:compact.sourceUrl,label:'已保存建模输入',source:'reconstruction-input'}:parsed.generatedImage;
          this.state.generatedCandidates = [{ id: 'hero-front', urlOrData: this.state.generatedImage.urlOrData, label: 'AI 换发预览' }];
          this.state.generatedImage.source ||= 'unverified';
          this.state.reconstruction=compact||parsed.reconstruction||idleModel();
          this.state.personalImage = parsed.personalImage || null;
          this.state.personalSideImage = parsed.schemaVersion === 2 ? parsed.personalSideImage || null : null;
          this.state.personalBackImage = parsed.schemaVersion === 2 ? parsed.personalBackImage || null : null;
          this.state.hairstyleImage = parsed.hairstyleImage || null;
          this.state.screen = 'result';
          this.state.request = { status: 'success', message: '' };
        }
      }
    } catch (e) {
      console.warn('Failed to load session from storage:', e);
    }
  }

  saveToStorage() {
    try{if(this.state.reconstruction.id)localStorage.setItem(MODEL_STORAGE_KEY,JSON.stringify(this.state.reconstruction));else localStorage.removeItem(MODEL_STORAGE_KEY);}catch{this.state.reconstruction.persistenceWarning='浏览器无法保存任务记录，请保留任务编号以便恢复';}
    try {
      if (this.state.generatedImage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          schemaVersion: 2,
          generatedImage: this.state.generatedImage,
          reconstruction:this.state.reconstruction,

          personalImage: this.state.personalImage,
          personalSideImage: this.state.personalSideImage,
          personalBackImage: this.state.personalBackImage,
          hairstyleImage: this.state.hairstyleImage
        }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      // Large portraits may exceed browser quota. Preserve at least the result.
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ generatedImage: this.state.generatedImage,reconstruction:this.state.reconstruction })); } catch { /* memory session still works */ }
      console.warn('Browser storage is full; inputs may need re-upload after refresh.');
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  setScreen(screen) {
    this.state.screen = screen;
    this.notify();
  }

  setPersonalImage(image) {
    this.state.personalImage = image;
    this.notify();
  }

  setPersonalSideImage(image) {
    this.state.personalSideImage = image;
    this.notify();
  }

  setPersonalBackImage(image) {
    this.state.personalBackImage = image;
    this.notify();
  }

  setHairstyleImage(image) {
    this.state.hairstyleImage = image;
    this.notify();
  }

  clearPersonalImage() {
    this.state.personalImage = null;
    this.notify();
  }

  clearPersonalSideImage() {
    this.state.personalSideImage = null;
    this.notify();
  }

  clearPersonalBackImage() {
    this.state.personalBackImage = null;
    this.notify();
  }

  clearHairstyleImage() {
    this.state.hairstyleImage = null;
    this.notify();
  }

  selectGeneratedCandidate(id) {
    const found = this.state.generatedCandidates.find(c => c.id === id);
    if (found) {
      this.modelEpoch=(this.modelEpoch||0)+1;this.state.reconstruction=idleModel();
      this.state.generatedImage = {
        urlOrData: found.urlOrData,
        label: found.label,
        createdAt: new Date().toISOString()
      };
      this.saveToStorage();
      this.notify();
    }
  }

  async setGeneratedResult(primaryUrl, { source = 'live', usage = null } = {}) {
    this.modelEpoch=(this.modelEpoch||0)+1;this.state.reconstruction=idleModel();
    this.state.generatedCandidates = [{ id: 'hero-front', urlOrData: primaryUrl, label: 'AI 换发预览' }];
    this.state.generatedImage = { urlOrData: primaryUrl, label: 'AI 换发预览', source, usage, createdAt: new Date().toISOString() };
    this.state.request = { status: 'success', message: '' };
    this.saveToStorage();
  }

  async triggerGenerate() {
    if (this.state.request.status === 'loading') {
      return; // Anti-duplicate concurrent execution
    }
    if (!this.state.personalImage || !this.state.hairstyleImage) {
      this.state.request = { status: 'error', message: '需要个人照片和理想发型两张图片' };
      this.notify();
      return;
    }

    this.state.request = { status: 'loading', message: '' };
    this.state.screen = 'generating';
    this.notify();

    try {
      const body = JSON.stringify({
        personalImage: this.state.personalImage,
        hairstyleImage: this.state.hairstyleImage
      });
      let response;
      try {
        response = await fetch('/api/generate-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        });
      } catch (error) {
        if(error?.name==='TypeError')throw new Error('无法连接本地服务。请确认 npm run dev 正在运行，再点击生成。已保留全部图片。');
        throw error;
      }
      const data = await response.json();
      if (!response.ok) {
        const error=new Error(data.error || '生成失败');
        if(data.usage)error.usage=data.usage;
        throw error;
      }
      await this.setGeneratedResult(data.image, { source: 'live', usage: data.usage });
      this.state.screen = 'result';
      this.notify();
    } catch (err) {
      this.state.request = { status: 'error', message: err.message || '网络或接口异常',...(err.usage?{usage:err.usage}:{}) };
      // Preserve input images on error
      this.state.screen = 'upload';
      this.notify();
    }
  }

  clearOldResultAndReplace() {
    this.modelEpoch=(this.modelEpoch||0)+1;this.state.reconstruction=idleModel();
    this.state.generatedImage = null;
    this.state.generatedCandidates = [];
    this.state.request = { status: 'idle', message: '' };
    this.state.screen = 'upload';
    this.saveToStorage();
    this.notify();
  }

  updateHairSection(zone, lengthPercent) {
    if (this.state.hairSections[zone] !== undefined) {
      this.state.hairSections[zone] = Math.max(10, Math.min(100, Math.round(lengthPercent)));
      this.notify();
    }
  }

  async startReconstruction({prepare=prepareReconstructionInput}={}){
    if(this.modelBusy||this.exampleBusy)return;
    if(!this.state.generatedImage?.urlOrData){this.state.reconstruction={...idleModel(),error:'请先生成融合图'};this.notify();return;}
    if(this.state.reconstruction.id&&this.state.reconstruction.source!=='example')return this.refreshReconstruction();
    const epoch=this.modelEpoch=(this.modelEpoch||0)+1,source=this.state.generatedImage.urlOrData;
    this.modelBusy=true;this.state.reconstruction={...idleModel(),status:'preparing'};this.notify();
    try{
      const image=await prepare(source);
      if(epoch!==(this.modelEpoch||0))return;
      this.state.reconstruction.status='submitting';this.notify();
      const response=await fetch('/api/reconstruction',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({imageDataUrl:image.dataUrl})});
      const data=await response.json();if(!response.ok)throw Error(data.error||'建模提交未确认，请恢复查询，勿重复创建任务');
      if(epoch!==(this.modelEpoch||0))return;
      this.state.reconstruction=data;this.saveToStorage();this.notify();
    }catch(error){if(epoch===(this.modelEpoch||0)){this.state.reconstruction={...this.state.reconstruction,status:'error',error:error.message||'建模连接失败，请恢复查询'};this.saveToStorage();this.notify();}}
    finally{this.modelBusy=false;}
  }

  async refreshReconstruction(){
    const id=this.state.reconstruction.id,epoch=this.modelEpoch||0;if(!id||this.queryModelBusy)return;
    this.queryModelBusy=true;
    try{
      const response=await fetch(`/api/reconstruction/${encodeURIComponent(id)}`);const data=await response.json();if(!response.ok)throw Error(data.error||'查询失败');
      if(epoch!==(this.modelEpoch||0)||id!==this.state.reconstruction.id)return;
      this.state.reconstruction=data;this.saveToStorage();this.notify();
    }catch{if(epoch===(this.modelEpoch||0)&&id===this.state.reconstruction.id){this.state.reconstruction.error='查询暂时中断，已保留原任务，可继续查询';this.saveToStorage();this.notify();}}
    finally{this.queryModelBusy=false;}
  }

  async loadReconstructionExample({isCurrent=()=>true}={}){
    if(this.modelBusy||this.exampleBusy)return;
    this.exampleBusy=true;const epoch=this.modelEpoch=(this.modelEpoch||0)+1;
    try{const response=await fetch('/api/reconstruction/example');const data=await response.json();if(!response.ok)throw Error(data.error||'实验模型无法载入');
      if(epoch!==(this.modelEpoch||0)||!isCurrent())return;this.state.reconstruction={...data,source:'example'};this.saveToStorage();this.state.screen='3d';this.notify();
    }catch(error){if(epoch===(this.modelEpoch||0)&&isCurrent()){this.state.reconstruction.error=error.message;this.notify();}}
    finally{this.exampleBusy=false;}
  }

  resetHairSections() {
    this.state.hairSections = { front: 100, left: 100, right: 100, crown: 100, back: 100 };
    this.state.fallingClumps = [];
    this.notify();
  }

  setHairSections(sections) {
    this.state.hairSections = { ...this.state.hairSections, ...sections };
    this.notify();
  }
}

export const sessionStore = new SessionStore();

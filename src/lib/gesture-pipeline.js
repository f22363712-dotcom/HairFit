import {ScissorsGesture,scissorsPose} from './scissors-gesture.js';

const clamp=value=>Math.max(.02,Math.min(.98,value));
const validPoints=points=>Array.isArray(points)&&points.length===21&&points.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z??0));
const gateReasons={cameraReady:'camera-not-ready',visible:'page-hidden',focused:'page-unfocused',mouseIdle:'mouse-cutting',viewStill:'view-moving',dialogClosed:'dialog-open',afterResume:'before-resume',viewportReady:'viewport-invalid'};

/** The production frame -> gate -> intent -> real cut path, independent of DOM/WebGL. */
export class GesturePipeline{
 constructor({recognizer=new ScissorsGesture(),reference=null,diagnostics=null,onCut=()=>({affectedStrands:0}),now=()=>performance.now(),maxResultAgeMs=250}={}){
  Object.assign(this,{recognizer,reference,diagnostics,onCut,now,maxResultAgeMs});
  this.aim=null;this.totals={recognized:0,hits:0,cutErrors:0};
 }
 reset(){this.recognizer.reset();this.reference?.reset();this.aim=null;}
 process(frame,context){
  const now=this.now(),elapsed=now-frame.timestamp;
  const age=Math.max(elapsed,Number.isFinite(frame.latencyMs)?frame.latencyMs:elapsed);
  const fresh=!frame.stale&&Number.isFinite(age)&&age>=0&&age<=this.maxResultAgeMs;
  const gates={cameraReady:context.cameraReady===true,visible:context.visible===true,focused:context.focused===true,
   mouseIdle:!context.mouseCutting,viewStill:!context.viewChanging,dialogClosed:!context.dialogOpen,
   afterResume:Number.isFinite(frame.timestamp)&&frame.timestamp>=(context.resumedAt??0),
   viewportReady:Number.isFinite(context.viewport?.width)&&context.viewport.width>0&&Number.isFinite(context.viewport?.height)&&context.viewport.height>0,
   fresh};
  const eligible=Object.keys(gateReasons).every(key=>gates[key]);
  const measured={...frame,latencyMs:age,stale:!fresh,detectedHand:typeof frame.detectedHand==='boolean'?frame.detectedHand:!!frame.hand};
  const observe=decision=>{
   this.diagnostics?.record({now,frame:measured,decision,reason:decision.reason,gates,eligible});
   return {...decision,gates,eligible,totals:{...this.totals}};
  };
  const block=reason=>{
   const hadIntent=this.recognizer.armed||!!this.aim;this.reset();
   let pose=null;
   if(fresh&&gates.visible&&gates.cameraReady&&validPoints(frame.hand?.landmarks)){
    try{pose=this.recognizer.getPose?this.recognizer.getPose(frame.hand):scissorsPose(frame.hand,this.recognizer);}catch{/* invalid world data remains unusable */}
   }
   return observe({status:'blocked',reason,armed:false,snip:false,pose,resetReason:hadIntent?reason:null,
    landmarks:fresh&&gates.visible&&gates.cameraReady&&validPoints(frame.hand?.landmarks)?frame.hand.landmarks:null});
  };
  for(const key of Object.keys(gateReasons))if(!gates[key])return block(gateReasons[key]);
  if(!fresh)return block('stale');
  if(frame.hand&&!validPoints(frame.hand.landmarks))return block('invalid-hand-data');
  let result,reference;
  try{result=this.recognizer.update(frame.hand,frame.timestamp);reference=this.reference?.update(frame.hand,frame.timestamp);}
  catch{return block('invalid-hand-data');}
  result={...result,landmarks:validPoints(frame.hand?.landmarks)?frame.hand.landmarks:null,
   legacySnip:!!reference?.snip,legacyStatus:reference?.status??null,legacyReason:reference?.reason??null};
  if(result.status==='open'||result.status==='opening'){
   if(result.aim&&Number.isFinite(result.aim.x)&&Number.isFinite(result.aim.y)){
    const target={x:clamp(result.aim.x),y:clamp(result.aim.y)};
    // Follow deliberate aim changes quickly while retaining one-frame jitter smoothing.
    const aim=result.opened||!this.aim?target:{x:this.aim.x+(target.x-this.aim.x)*.8,y:this.aim.y+(target.y-this.aim.y)*.8};
    if(result.armed)this.aim=aim;
    result.aimPixels={x:aim.x*context.viewport.width,y:aim.y*context.viewport.height};
   }
  }
  if(result.snip&&this.aim){
   const target={x:this.aim.x*context.viewport.width,y:this.aim.y*context.viewport.height};
   this.totals.recognized++;
   try{
    const cutReport=this.onCut(target.x,target.y)||{};
    result={...result,aimPixels:target,cutHit:cutReport.affectedStrands>0,cutReport};
    if(result.cutHit)this.totals.hits++;
   }catch{
    this.totals.cutErrors++;result={...result,status:'cut-error',reason:'cut-error',cutHit:false};
   }
   this.aim=null;
  }
  if(!result.armed&&!result.snip)this.aim=null;
  return observe(result);
 }
}

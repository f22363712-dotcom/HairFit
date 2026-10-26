const finite=value=>Number.isFinite(value)?Math.round(value*1000)/1000:null;
const flags=value=>value?['index','middle','ring','little'].map(key=>value[key]?'1':'0').join(''):null;
const gateKeys=['cameraReady','visible','focused','mouseIdle','viewStill','dialogClosed','afterResume','viewportReady','fresh'];
const timingKeys=['latencyMs','inferenceMs','bitmapMs','workerRoundTripMs','deliveryMs','cutMs'];
const bounds=[16,33,65,100,150,250,500,1000];
let trialSequence=0;
const clone=value=>JSON.parse(JSON.stringify(value));
const newTiming=()=>({count:0,unknown:0,sum:0,min:Infinity,max:-Infinity,bins:Array(bounds.length+1).fill(0)});
function addTiming(stat,value){
 if(!Number.isFinite(value)||value<0){stat.unknown++;return;}
 stat.count++;stat.sum+=value;stat.min=Math.min(stat.min,value);stat.max=Math.max(stat.max,value);
 const index=bounds.findIndex(bound=>value<=bound);stat.bins[index<0?bounds.length:index]++;
}
function timingReport(stat){
 return {count:stat.count,unknown:stat.unknown,min:finite(stat.min),max:finite(stat.max),mean:stat.count?finite(stat.sum/stat.count):null,
  histogram:stat.bins.map((count,index)=>({upperMs:bounds[index]??null,count}))};
}

/** Bounded numeric observations only. No image, video, identity or joint arrays. */
export class GestureDiagnostics{
 constructor({durationMs=10000,maxSamples=240,continuous=false}={}){
  Object.assign(this,{durationMs,maxSamples,continuous});this.active=false;this.waiting=false;this.trialId=null;this.clear();
 }
 clear(){
  this.samples=[];this.activeSamples=[];this.events=[];this.counts={};this.gateCounts={};
  this.frames=0;this.snips=0;this.hits=0;this.legacySnips=0;this.elapsedMs=0;
  this.detectedHands=0;this.unknownDetectionFrames=0;this.staleFrames=0;
  this.timingStats=Object.fromEntries(timingKeys.map(key=>[key,newTiming()]));
  this.stopReason=null;this.endedAt=null;this.lastEligibleReason=null;this.lastEventSignature=null;
 }
 beginIdentity(now){this.trialId='trial-'+Date.now().toString(36)+'-'+(++trialSequence);this.armedAt=now;this.lastNow=now;}
 start(now){
  if(!this.waiting){this.clear();this.beginIdentity(now);}
  this.startedAt=now;this.lastNow=now;this.waiting=false;this.active=true;
 }
 arm(now=0){
  this.clear();this.beginIdentity(now);this.startedAt=this.continuous?now:null;
  this.waiting=!this.continuous;this.active=this.continuous;
 }
 stop(now=this.lastNow??this.startedAt??0,reason='manual'){
  if(this.active||this.waiting){
   this.endedAt=Math.max(this.lastNow??0,Number.isFinite(now)?now:0,this.startedAt??this.armedAt??0);
   this.elapsedMs=this.startedAt===null?0:this.endedAt-this.startedAt;
   this.stopReason=reason;
  }
  this.active=false;this.waiting=false;
 }
 pushBounded(list,value,limit=this.maxSamples){if(list.length>=limit)list.shift();list.push(clone(value));}
 mark(reason,now){
  if(!this.active&&!this.waiting)return;
  this.lastNow=Math.max(this.lastNow??0,now);
  this.pushBounded(this.events,{type:'lifecycle',reason,t:finite(now-(this.startedAt??this.armedAt)),sequence:this.frames},Math.min(this.maxSamples,64));
 }
 record({now,frame,decision={},reason,gates={},eligible=true}){
  if(this.waiting&&frame.timestamp>=this.armedAt&&(frame.detectedHand||frame.hand))this.start(frame.timestamp);
  if(!this.active)return;
  if(!this.continuous&&now-this.startedAt>=this.durationMs){this.stop(now,'duration');return;}
  if(frame.timestamp<this.startedAt)return;
  this.frames++;this.lastNow=now;this.elapsedMs=Math.max(this.elapsedMs,now-this.startedAt);
  const pose=decision.pose,kind=reason||decision.reason||decision.status||'unknown';
  const detectedHand=typeof frame.detectedHand==='boolean'?frame.detectedHand:frame.hand?true:null;
  const stale=!!frame.stale;
  this.counts[kind]=(this.counts[kind]||0)+1;
  this.snips+=Number(!!decision.snip);this.hits+=Number(!!decision.snip&&!!decision.cutHit);this.legacySnips+=Number(!!decision.legacySnip);
  this.detectedHands+=Number(detectedHand===true);this.unknownDetectionFrames+=Number(detectedHand===null);this.staleFrames+=Number(stale);
  const safeGates={};
  for(const key of gateKeys)if(typeof gates[key]==='boolean'){
   safeGates[key]=gates[key];if(!gates[key])this.gateCounts[key]=(this.gateCounts[key]||0)+1;
  }
  const timings={latencyMs:frame.latencyMs,inferenceMs:frame.inferenceMs,bitmapMs:frame.timings?.bitmapMs,
   workerRoundTripMs:frame.timings?.workerRoundTripMs,deliveryMs:frame.timings?.deliveryMs,cutMs:decision.cutReport?.durationMs};
  for(const key of timingKeys)if(key!=='cutMs'||decision.snip)addTiming(this.timingStats[key],timings[key]);
  const sample={type:'frame',sequence:this.frames,t:finite(frame.timestamp-this.startedAt),frameId:finite(frame.frameId),
   status:decision.status||kind,reason:kind,eligible:!!eligible,gates:safeGates,detectedHand,stale,
   reset:decision.resetReason||null,hasPose:!!pose,validPose:typeof pose?.valid==='boolean'?pose.valid:null,armed:!!decision.armed,snip:!!decision.snip,cutHit:!!decision.cutHit,
   closeAt:finite(decision.closeThreshold),projectionRatio:finite(pose?.projectionRatio),
   legacySnip:!!decision.legacySnip,legacyStatus:decision.legacyStatus||null,legacyReason:decision.legacyReason||null,
   gap3d:finite(pose?.worldGap),gapCamera:finite(pose?.cameraGap),gap2d:finite(pose?.screenGap),gestureGap:finite(pose?.gap),metric:['world','camera','screen','palm'].includes(pose?.metric||pose?.space)?pose.metric||pose.space:null,
   posePolicy:['depth','world','screen'].includes(pose?.policy)?pose.policy:null,
   gestureKind:pose?.kind==='pinch'?'pinch':'scissors',
   fingers:flags(pose?.fingers),cameraFingers:flags(pose?.cameraFingers),screenFingers:flags(pose?.screenFingers),intentFingers:flags(pose?.intentFingers),
   hand:['Left','Right'].includes(pose?.handedness)?pose.handedness:null,
   inferenceMs:finite(frame.inferenceMs),latencyMs:finite(frame.latencyMs),
   timings:Object.fromEntries(timingKeys.map(key=>[key,finite(timings[key])]))};
  // Chat activity cannot evict the last eligible hand transition.
  if(eligible&&!stale&&(detectedHand===true||pose||decision.snip||decision.resetReason||kind!==this.lastEligibleReason))this.pushBounded(this.activeSamples,sample);
  if(eligible&&!stale)this.lastEligibleReason=kind;
  const signature=JSON.stringify([kind,sample.status,detectedHand,stale,safeGates]);
  if(signature!==this.lastEventSignature||sample.snip||sample.reset)this.pushBounded(this.events,sample,Math.min(this.maxSamples,64));
  this.lastEventSignature=signature;
  const previous=this.samples.at(-1);
  const compress=this.continuous&&!pose&&!sample.snip&&!sample.legacySnip&&previous&&!previous.hasPose&&!previous.snip&&!previous.legacySnip
   &&previous.reason===kind&&previous.detectedHand===detectedHand&&previous.stale===stale&&previous.eligible===sample.eligible&&JSON.stringify(previous.gates)===JSON.stringify(safeGates);
  if(compress){
   previous.repeats=(previous.repeats||1)+1;previous.endT=sample.t;
   if(Number.isFinite(sample.latencyMs)){
    const range=previous.latencyRangeMs||{min:previous.latencyMs,max:previous.latencyMs};
    previous.latencyRangeMs={min:range.min===null?sample.latencyMs:Math.min(range.min,sample.latencyMs),max:range.max===null?sample.latencyMs:Math.max(range.max,sample.latencyMs)};
   }
   return;
  }
  if(this.samples.length>=this.maxSamples){if(this.continuous)this.samples.shift();else return;}
  this.samples.push(sample);
 }
 report(){
  return clone({schema:4,recordsVideo:false,trialId:this.trialId,recording:this.active||this.waiting,mode:this.continuous?'continuous':'timed',
   armedAtMs:finite(this.armedAt),startedAtMs:finite(this.startedAt),endedAtMs:finite(this.endedAt),stopReason:this.stopReason,durationMs:finite(this.elapsedMs),
   frames:this.frames,snips:this.snips,hits:this.hits,legacySnips:this.legacySnips,detectedHands:this.detectedHands,unknownDetectionFrames:this.unknownDetectionFrames,staleFrames:this.staleFrames,
   counts:this.counts,gateCounts:this.gateCounts,timings:Object.fromEntries(timingKeys.map(key=>[key,timingReport(this.timingStats[key])])),
   samples:this.samples,activeSamples:this.activeSamples,events:this.events});
 }
}

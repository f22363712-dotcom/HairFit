const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,(a.z||0)-(b.z||0));
const validPoints=p=>Array.isArray(p)&&p.length===21&&p.every(v=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z??0));
function extended(p,mcp,pip,tip,relaxed=false){
  const ax=p[mcp].x-p[pip].x,ay=p[mcp].y-p[pip].y,az=(p[mcp].z||0)-(p[pip].z||0);
  const bx=p[tip].x-p[pip].x,by=p[tip].y-p[pip].y,bz=(p[tip].z||0)-(p[pip].z||0);
  const denom=Math.hypot(ax,ay,az)*Math.hypot(bx,by,bz);
  return denom>1e-8&&(ax*bx+ay*by+az*bz)/denom<(relaxed?-.35:-.65)
    &&distance(p[0],p[tip])>distance(p[0],p[pip])*(relaxed?1.04:1.10);
}
function pointsAway(p,mcp,tip){
  const ax=p[tip].x-p[mcp].x,ay=p[tip].y-p[mcp].y,az=(p[tip].z||0)-(p[mcp].z||0);
  const bx=p[mcp].x-p[0].x,by=p[mcp].y-p[0].y,bz=(p[mcp].z||0)-(p[0].z||0);
  const scale=Math.hypot(ax,ay,az)*Math.hypot(bx,by,bz);
  return scale>1e-8&&(ax*bx+ay*by+az*bz)/scale>.4;
}
function fingerFlags(p,relaxed=false,checkBase=relaxed){
  if(!p)return null;
  // A finger bent at its base can have straight PIP/DIP joints while resting toward the palm.
  const extra=(mcp,pip,tip)=>extended(p,mcp,pip,tip)&&(!checkBase||pointsAway(p,mcp,tip));
  return {index:extended(p,5,6,8,relaxed),middle:extended(p,9,10,12,relaxed),ring:extra(13,14,16),little:extra(17,18,20)};
}
export function scissorsPose(hand,{space='depth',requireFoldedRing=false,metric:lockedMetric=null}={}){
  const screen=hand?.landmarks;
  if(!validPoints(screen)||!['depth','screen','world'].includes(space))return null;
  const aspect=hand.aspect??1;if(!Number.isFinite(aspect)||aspect<=0)return null;
  const camera=screen.map(p=>({x:p.x*aspect,y:p.y,z:(p.z||0)*aspect}));
  const planar=camera.map(p=>({...p,z:0}));
  const hasWorld=validPoints(hand.worldLandmarks)&&distance(hand.worldLandmarks[5],hand.worldLandmarks[17])>=1e-4;
  const world=hasWorld?hand.worldLandmarks:null;
  const cameraPalm=distance(camera[5],camera[17]),screenPalm=distance(planar[5],planar[17]);
  const worldGap=world?distance(world[8],world[12])/distance(world[5],world[17]):null;
  const cameraGap=cameraPalm>=1e-4?distance(camera[8],camera[12])/cameraPalm:null;
  const screenGap=screenPalm>=1e-4?distance(planar[8],planar[12])/screenPalm:null;
  // Camera XY is projected but Z is wrist-relative. Only compare its gaps while
  // the opening palm basis stays stable; world distances do not need this gate.
  const cameraPalmBasis=cameraPalm>=1e-4?[0,9,17].flatMap(i=>[
    (camera[i].x-camera[5].x)/cameraPalm,(camera[i].y-camera[5].y)/cameraPalm,(camera[i].z-camera[5].z)/cameraPalm]):null;
  const fingers=fingerFlags(world),cameraFingers=fingerFlags(camera),screenFingers=fingerFlags(planar);
  const palmLength=distance(planar[0],planar[9]),projectionRatio=palmLength>1e-4?screenPalm/palmLength:0;
  const ax=planar[17].x-planar[5].x,ay=planar[17].y-planar[5].y,fx=planar[9].x-planar[0].x,fy=planar[9].y-planar[0].y;
  const palmAreaScale=Math.hypot(ax,ay)*Math.hypot(fx,fy),palmCondition=palmAreaScale>1e-8?Math.abs(ax*fy-ay*fx)/palmAreaScale:0;
  const isV=f=>!!f&&f.index&&f.middle&&!f.little&&(!requireFoldedRing||!f.ring);
  let metric,intentFingers,valid,rejectionReason=null,ambiguous=false;
  if(space==='depth'){
    const w=fingerFlags(world,true),c=fingerFlags(camera,true),s=fingerFlags(planar,true,false);
    // Choose a complete metric at opening; never swap its distance basis mid-motion.
    metric=lockedMetric||(w?.index&&w.middle?'world':'camera');
    intentFingers=isV(w)?w:isV(c)?c:isV(s)?s:(metric==='world'?w:c);
    const available=metric==='world'?worldGap:metric==='camera'?cameraGap:null;
    const confidence=metric==='world'?w:metric==='camera'?c:null;
    valid=isV(w)||isV(c)||isV(s);
    const hardReject=!!w&&((w.little&&c.little)||(!w.index&&!w.middle&&!c.index&&!c.middle));
    if(!Number.isFinite(available)){valid=false;rejectionReason='metric-unavailable';}
    else if(hardReject){valid=false;rejectionReason='pose-rejected';}
    else if(!isV(w)&&valid&&palmCondition<.25){valid=false;rejectionReason='edge-on';}
    else if(valid&&!(confidence?.index&&confidence.middle)){valid=false;ambiguous=true;rejectionReason='metric-uncertain';}
    else if(metric==='camera'&&projectionRatio<.30){valid=false;rejectionReason='edge-on';}
    else if(!valid)rejectionReason='pose-rejected';
  }else{
    metric=space==='screen'?'screen':world?'world':'camera';
    intentFingers=space==='screen'?screenFingers:(fingers||cameraFingers);
    valid=isV(intentFingers);
    if(space==='screen'&&projectionRatio<.30){valid=false;rejectionReason='edge-on';}
    if(space==='world'&&hand.worldLandmarks?.length===21&&!hasWorld){valid=false;rejectionReason='metric-unavailable';}
  }
  const metrics={world:worldGap,camera:cameraGap,screen:screenGap},gap=metrics[metric];
  if(!Number.isFinite(gap))valid=false;
  return {valid,rejectionReason,ambiguous,projectionRatio,palmCondition,fingers,cameraFingers,screenFingers,intentFingers,space:metric,metric,policy:space,worldGap,cameraGap,screenGap,cameraPalmBasis,gap,
    aim:{x:1-(screen[8].x+screen[12].x)/2,y:(screen[8].y+screen[12].y)/2},handedness:hand.handedness||'unknown'};
}

/** Converts detected joints into discrete intent. It never uses image motion or a timer to invent a snip. */
export class ScissorsGesture{
  constructor({space='depth',requireFoldedRing=false,openGap=.55,closeGap=.30,relativeCloseRatio=.65,maxCloseGap=.50,openDwellMs=0,closeDwellMs=55,cooldownMs=180,cooldownAtOpen=false,maxFrameGapMs=250,maxAimJump=.28,fastCloseDrop=.35,maxUncertaintyMs=120}={}){
    Object.assign(this,{space,requireFoldedRing,openGap,closeGap,relativeCloseRatio,maxCloseGap,openDwellMs,closeDwellMs,cooldownMs,cooldownAtOpen,maxFrameGapMs,maxAimJump,fastCloseDrop,maxUncertaintyMs});
    this.lastSnip=-Infinity;this.reset();
  }
  reset(){this.armed=false;this.openSince=null;this.closeSince=null;this.lastTime=null;this.lastHand=null;this.lastAim=null;this.openAim=null;this.openGapSeen=null;this.openGapPeak=null;this.activeMetric=null;this.lastMetric=null;this.uncertainSince=null;this.openCameraPalmBasis=null;}
  update(hand,time){return this.updatePose(scissorsPose(hand,{...this,metric:this.armed?this.activeMetric:null}),time,hand?.landmarks);}
  // Same intent path also supports replaying sanitized gap traces without saving joints.
  updatePose(pose,time,landmarks){
    let resetReason=null;
    if(!Number.isFinite(time)) {this.reset();return {status:'no-hand',armed:false,snip:false};}
    if(this.lastTime!==null && (time<=this.lastTime || time-this.lastTime>this.maxFrameGapMs)){resetReason=time<=this.lastTime?'time-regression':'frame-gap';this.reset();}
    this.lastTime=time;
    const validNumbers=Number.isFinite(pose?.gap)&&pose.gap>=0&&Number.isFinite(pose?.aim?.x)&&Number.isFinite(pose?.aim?.y);
    if(validNumbers){
      const jump=this.lastAim&&Math.hypot(pose.aim.x-this.lastAim.x,pose.aim.y-this.lastAim.y)>this.maxAimJump;
      const switched=this.lastHand!==null&&pose.handedness!==this.lastHand;
      const source=pose.metric||pose.space||'replay';
      const changed=this.lastMetric!==null&&source!==this.lastMetric&&(this.armed||this.openSince!==null);
      const palmMoved=this.armed&&(source==='camera'||pose.stablePalmRequired===true)&&this.openCameraPalmBasis&&pose.cameraPalmBasis&&Math.hypot(...pose.cameraPalmBasis.map((v,i)=>v-this.openCameraPalmBasis[i]))>.15;
      const expired=this.uncertainSince!==null&&time-this.uncertainSince>this.maxUncertaintyMs;
      if(jump||switched||changed||expired||palmMoved){resetReason=switched?'hand-switch':jump?'aim-jump':changed?'metric-switch':palmMoved?'camera-palm-motion':'uncertainty-expired';this.reset();this.lastTime=time;}
      if(pose.valid!==true&&pose.ambiguous&&this.armed&&!resetReason){
        this.uncertainSince??=time;
        return {status:'uncertain',reason:pose.rejectionReason,pose,armed:true,snip:false,aim:this.openAim,landmarks};
      }
    }
    if(pose?.valid!==true||!validNumbers){this.reset();this.lastTime=time;return {status:pose?'not-scissors':'no-hand',reason:pose?.rejectionReason||(pose?'pose-rejected':'no-hand'),pose,resetReason,armed:false,snip:false,landmarks};}
    this.uncertainSince=null;this.lastHand=pose.handedness;this.lastAim=pose.aim;this.lastMetric=pose.metric||pose.space||'replay';
    const closeThreshold=this.armed&&this.relativeCloseRatio!==null
      ? Math.max(this.closeGap,Math.min(this.maxCloseGap,this.openGap-.05,(this.openGapPeak||this.openGap)*this.relativeCloseRatio))
      : this.closeGap;
    const out={status:'closed',reason:'not-armed',pose,resetReason,armed:this.armed,snip:false,aim:pose.aim,gap:pose.gap,closeThreshold,landmarks};
    // A discontinuity frame cannot also provide the new instant-open intent.
    if(resetReason && this.openDwellMs===0)return {...out,status:'opening',reason:resetReason};
    if(pose.gap>=this.openGap){
      const wasArmed=this.armed;
      this.closeSince=null;
      if(this.openSince===null){this.openSince=time;if(!this.armed)this.openGapPeak=null;}
      this.openAim=pose.aim;
      this.openGapSeen=pose.gap;
      this.openGapPeak=Math.max(this.openGapPeak||0,pose.gap);
      if(time-this.openSince>=this.openDwellMs && (!this.cooldownAtOpen || time-this.lastSnip>=this.cooldownMs)){if(!this.armed)this.openCameraPalmBasis=pose.cameraPalmBasis?.slice()||null;this.armed=true;this.activeMetric=this.lastMetric;}
      return {...out,status:this.armed?'open':'opening',reason:this.armed?'aim-ready':time-this.openSince<this.openDwellMs?'open-dwell':'cooldown',armed:this.armed,opened:this.armed&&!wasArmed};
    }
    if(pose.gap>closeThreshold){
      this.closeSince=null;
      if(!this.armed)this.openSince=null;
      return {...out,status:this.armed?'open':'opening',reason:'between-thresholds',armed:this.armed};
    }
    if(this.armed){
      if(!this.cooldownAtOpen && time-this.lastSnip<this.cooldownMs){
        // Consume an early closure so holding it cannot fire later on a timer.
        this.armed=false;this.openSince=null;this.closeSince=null;
        return {...out,armed:false,reason:'cooldown'};
      }
      if(this.closeSince===null)this.closeSince=time;
      const closureStart=this.relativeCloseRatio!==null?this.openGapPeak:this.openGapSeen;
      const clearClosure=closureStart!==null && closureStart-pose.gap>=this.fastCloseDrop;
      if(clearClosure || time-this.closeSince>=this.closeDwellMs){
        const aim=this.openAim;
        this.lastSnip=time;this.armed=false;this.openSince=null;this.closeSince=null;
        return {...out,status:'snip',reason:clearClosure?'fast-close':'closed-confirmed',armed:false,snip:true,aim};
      }
      return {...out,status:'closing',reason:'close-dwell'};
    }
    this.openSince=null;
    return out;
  }
}

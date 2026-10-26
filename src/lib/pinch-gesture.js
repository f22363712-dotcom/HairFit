import {ScissorsGesture} from './scissors-gesture.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,(a.z||0)-(b.z||0));
const usable=p=>Array.isArray(p)&&p.length===21&&p.every(v=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z??0))&&distance(p[5],p[17])>=1e-4;

/** Visible thumb/index contact, guarded against palm rotation and fist retraction. */
export function pinchPose(hand,{metric:lockedMetric=null}={}){
 const p=hand?.landmarks;
 if(!usable(p))return null;
 const aspect=hand.aspect??1;
 if(!Number.isFinite(aspect)||aspect<=0)return null;
 const camera=hand.landmarks.map(p=>({x:p.x*aspect,y:p.y,z:(p.z||0)*aspect}));
 const world=usable(hand.worldLandmarks)?hand.worldLandmarks:null;
 const gap=p=>usable(p)?distance(p[4],p[8])/distance(p[5],p[17]):null;
 const worldGap=gap(world),cameraGap=gap(camera);
 const screen=hand.landmarks.map(v=>({x:v.x*aspect,y:v.y,z:0}));
 const screenGap=gap(screen),metric=lockedMetric||'screen';
 const points=camera;
 const available=metric==='screen'?screenGap:null;
 // A retracted index tip in a fist is not a pinch control, even if the thumb is nearby.
 const indexReach=points?distance(points[0],points[8])/Math.max(1e-4,distance(points[0],points[5])):0;
 const a=points[5],b=points[6],tip=points[8];
 const dot=(a.x-b.x)*(tip.x-b.x)+(a.y-b.y)*(tip.y-b.y)+(a.z-b.z)*(tip.z-b.z);
 const relaxedIndex=dot<-.15*distance(a,b)*distance(tip,b)&&distance(points[0],tip)>.9*distance(points[0],b);
 const ax=screen[17].x-screen[5].x,ay=screen[17].y-screen[5].y,fx=screen[9].x-screen[0].x,fy=screen[9].y-screen[0].y;
 const palmAreaScale=Math.hypot(ax,ay)*Math.hypot(fx,fy),palmCondition=palmAreaScale>1e-8?Math.abs(ax*fy-ay*fx)/palmAreaScale:0;
 const palmLength=distance(screen[0],screen[9]),projectionRatio=palmLength>1e-4?distance(screen[5],screen[17])/palmLength:0;
 const otherTipsFolded=['middle','ring','little'].every((key,index)=>{
   const mcp=[9,13,17][index],tip=[12,16,20][index];
   return distance(screen[0],screen[tip])<distance(screen[0],screen[mcp])*1.25;
 });
 let rejectionReason=!Number.isFinite(available)?'metric-unavailable':indexReach<=1.05||!relaxedIndex?'index-retracted':null;
 if(!rejectionReason&&(palmCondition<.20||projectionRatio<.20))rejectionReason='edge-on';
 return {kind:'pinch',valid:!rejectionReason,rejectionReason,ambiguous:false,
  metric,space:metric,policy:'screen',stablePalmRequired:true,gap:available,worldGap,cameraGap,screenGap,
  projectionRatio,palmCondition,cameraPalmBasis:[0,5].flatMap(i=>[
   (camera[i].x-camera[0].x)/Math.max(1e-4,distance(camera[0],camera[5])),
   (camera[i].y-camera[0].y)/Math.max(1e-4,distance(camera[0],camera[5])),
   (camera[i].z-camera[0].z)/Math.max(1e-4,distance(camera[0],camera[5]))]),
  fingers:{index:indexReach>1.05,middle:false,ring:false,little:false},cameraFingers:null,screenFingers:null,intentFingers:null,
  handedness:hand.handedness||'unknown',aim:{x:1-(p[4].x+p[8].x)/2,y:(p[4].y+p[8].y)/2}};
}

export class PinchGesture extends ScissorsGesture{
 constructor(options={}){
  super({space:'screen',openGap:.75,closeGap:.50,maxCloseGap:.50,relativeCloseRatio:null,fastCloseDrop:.25,...options});
  this.kind='pinch';
 }
 getPose(hand){return pinchPose(hand,{metric:this.armed?this.activeMetric:null});}
 update(hand,time){return this.updatePose(this.getPose(hand),time,hand?.landmarks);}
}

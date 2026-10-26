import * as THREE from 'three';
import { anatomicalScalp, resolveHeadCollision } from './head-anatomy.js';
import { sampleScalpDirections } from './scalp-sampling.js';

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function measurePortrait({data,width,height,landmarks}){
  if(!landmarks?.[454] || !data || width<32 || height<32)throw new Error('No usable frontal face');
  const left=landmarks[234].x,right=landmarks[454].x,chin=landmarks[152].y;
  const eyeY=(landmarks[33].y+landmarks[263].y)/2,forehead=landmarks[10].y;
  const center=(left+right)/2,faceWidth=right-left;
  if(faceWidth<.12||chin-eyeY<.12||Math.abs(landmarks[33].y-landmarks[263].y)>.045)throw new Error('Use an upright frontal face');
  const bg=[0,0,0];let count=0;
  for(const [x0,y0] of [[0,0],[width-8,0],[0,height-8],[width-8,height-8]])for(let y=y0;y<y0+8;y++)for(let x=x0;x<x0+8;x++){
    const i=(y*width+x)*4;for(let c=0;c<3;c++)bg[c]+=data[i+c];count++;
  }
  for(let c=0;c<3;c++)bg[c]/=count;
  let lowerHair=0,lowerSamples=0;
  for(let y=Math.floor((eyeY+(chin-eyeY)*.60)*height);y<chin*height;y++)for(const side of [left,right]){
    for(let x=Math.floor((side-faceWidth*.16)*width);x<(side+faceWidth*.16)*width;x++){
      if(x<0||x>=width)continue;const i=(y*width+x)*4,r=data[i],g=data[i+1],b=data[i+2];lowerSamples++;
      if(.299*r+.587*g+.114*b<125&&Math.hypot(r-bg[0],g-bg[1],b-bg[2])>45)lowerHair++;
    }
  }
  if(lowerHair/Math.max(1,lowerSamples)>.50)throw new Error('Only short hair is supported by this measured groom');
  const x0=Math.floor(clamp(left-faceWidth*.35,0,1)*width),x1=Math.ceil(clamp(right+faceWidth*.35,0,1)*width);
  const ymax=Math.floor((eyeY-.02)*height),fringe=new Array(17).fill(null),rows=[];
  const candidates=new Uint8Array(width*ymax),queue=new Int32Array(width*ymax);
  for(let y=0;y<ymax;y++)for(let x=x0;x<x1;x++){
    const i=(y*width+x)*4,r=data[i],g=data[i+1],b=data[i+2];
    if(.299*r+.587*g+.114*b<=145&&Math.hypot(r-bg[0],g-bg[1],b-bg[2])>=45)candidates[y*width+x]=1;
  }
  let largest=[];
  for(let start=0;start<candidates.length;start++)if(candidates[start]===1){
    let read=0,end=1;queue[0]=start;candidates[start]=2;
    while(read<end){const i=queue[read++],x=i%width;
      for(const next of [x?i-1:-1,x<width-1?i+1:-1,i-width,i+width])if(next>=0&&next<candidates.length&&candidates[next]===1){candidates[next]=2;queue[end++]=next;}
    }
    if(end>largest.length)largest=Array.from(queue.subarray(0,end));
  }
  candidates.fill(0);for(const i of largest)candidates[i]=1;
  let minX=width,maxX=0,minY=height,hits=0;const colors=[];
  for(let y=0;y<ymax;y++){
    let lo=width,hi=-1;
    for(let x=x0;x<x1;x++){
      const i=(y*width+x)*4,r=data[i],g=data[i+1],b=data[i+2];
      // shortcut: dark hair on a plain light background; reject unsupported masks.
      if(!candidates[y*width+x])continue;
      lo=Math.min(lo,x);hi=Math.max(hi,x);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);hits++;
      if(y<forehead*height)colors.push([r,g,b]);
      const bin=Math.round((x/width-left)/faceWidth*16);
      if(bin>=0&&bin<17)fringe[bin]=y/height;
    }
    rows.push(hi>=lo?[lo/width,hi/width]:null);
  }
  const hairWidth=(maxX-minX)/width,top=minY/height;
  if(hits<width*height*.015||hairWidth<faceWidth*.65||top>=forehead-.03)throw new Error('Hair silhouette unavailable; use a plain light background and dark short hair');
  for(let k=0;k<17;k++)if(fringe[k]===null)fringe[k]=forehead;
  colors.sort((a,b)=>a[0]+a[1]+a[2]-b[0]-b[1]-b[2]);
  const hairColor=colors[Math.floor(colors.length*.55)]||[65,45,32];
  return {method:'generated-portrait-measured',left,right,center,faceWidth,eyeY,chin,forehead,top,hairWidth,fringe,rows,hairColor,
    scale:clamp(.825/(chin-eyeY),1.1,4.5),landmarks:landmarks.map(p=>({x:p.x,y:p.y,z:p.z||0}))};
}

export const FACE_OVAL=[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
export function createPortraitSkull(p,face,template){
  const positions=[],indices=[],n=FACE_OVAL.length;
  const top=face.positions[10*3+1],bottom=face.positions[152*3+1],middle=(top+bottom)/2;
  for(let ring=0;ring<6;ring++)for(const i of FACE_OVAL){
    const x=face.positions[i*3],y=face.positions[i*3+1],z=face.positions[i*3+2];
    if(ring===0){positions.push(x,y,z);continue;}
    const angle=Math.atan2((y-middle)/((top-bottom)/2),x/(p.faceWidth*p.scale*.5));
    const shrink=ring===5?.025:ring===4?.55:1;
    const ry=Math.sin(angle),ringY=middle+(ry>0?(.91-middle):(.82+middle))*ry;
    const targetX=Math.cos(angle)*.59*shrink,targetY=middle+(ringY-middle)*shrink;
    const depth=[0,.22,-.08,-.36,-.52,-.58][ring];
    positions.push(ring===1?x*.5+targetX*.5:targetX,ring===1?y*.5+targetY*.5:targetY,depth);
  }
  for(let ring=0;ring<5;ring++)for(let k=0;k<n;k++){
    const a=ring*n+k,b=ring*n+(k+1)%n,c=a+n,d=b+n;indices.push(a,c,b,b,c,d);
  }
  // Retain the original neck/shoulders and ears, removing its unrelated face/skull.
  const offset=positions.length/3;positions.push(...template.positions);
  for(let i=0;i<template.indices.length;i+=3){
    const tri=template.indices.slice(i,i+3);
    const keep=tri.every(j=>template.positions[j*3+1]<-.80)||tri.every(j=>Math.abs(template.positions[j*3])>.51&&template.positions[j*3+1]<.20&&template.positions[j*3+1]>-.32&&Math.abs(template.positions[j*3+2])<.18);
    if(keep)indices.push(...tri.map(j=>j+offset));
  }
  return {positions:new Float32Array(positions),indices};
}
export function createPortraitFace(p,triangles){
  if(!triangles?.length||triangles.some(i=>!Number.isInteger(i)||i<0||i>=p.landmarks.length))throw new Error('Invalid face topology');
  const positions=[],uv=[],indices=[...triangles];
  const edgeZ=(p.landmarks[234].z+p.landmarks[454].z)/2;
  p.landmarks.forEach((point,i)=>{
    positions.push((point.x-p.center)*p.scale,.04595+(p.eyeY-point.y)*p.scale,.48-(point.z-edgeZ)*p.scale*.85);
    uv.push(point.x,1-point.y);
  });
  // The standard face tessellation leaves eyes and inner lips open.
  for(const loop of [[33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246],[263,249,390,373,374,380,381,382,362,398,384,385,386,387,388,466],[78,95,88,178,87,14,317,402,318,324,308,415,310,311,312,13,82,81,80,191]]){
    const center=positions.length/3;
    for(let axis=0;axis<3;axis++)positions.push(loop.reduce((sum,i)=>sum+positions[i*3+axis],0)/loop.length);
    for(let axis=0;axis<2;axis++)uv.push(loop.reduce((sum,i)=>sum+uv[i*2+axis],0)/loop.length);
    for(let i=0;i<loop.length;i++)indices.push(center,loop[i],loop[(i+1)%loop.length]);
  }
  return {positions:new Float32Array(positions),uv:new Float32Array(uv),indices};
}

/** Fit the template's front surface behind the measured face, including its rim. */
export function fitPortraitHead(original,p,face){
  const result=new Float32Array(original),fp=face.positions;
  const outline=FACE_OVAL.map(i=>[fp[i*3],fp[i*3+1]]);
  const widths=new Float32Array(180);
  for(let i=0;i<original.length;i+=3)if(original[i+2]>.18){const row=Math.round((original[i+1]+.9)*100);if(row>=0&&row<widths.length)widths[row]=Math.max(widths[row],Math.abs(original[i]));}
  for(let i=0;i<original.length;i+=3){
    let x=original[i],y=original[i+1],z=original[i+2];if(z<.1||y<-.86||y>.65)continue;
    const xs=[];
    for(let k=0;k<outline.length;k++){
      const a=outline[k],b=outline[(k+1)%outline.length];
      if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))xs.push(a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1]));
    }
    if(xs.length<2)continue;
    const lo=Math.min(...xs),hi=Math.max(...xs),row=Math.round((y+.9)*100);
    const templateWidth=widths[row]||.45,amount=clamp((z-.10)/.24,0,1);
    const targetX=(lo+hi)/2+x/templateWidth*(hi-lo)/2;
    x+=(targetX-x)*amount;
    const nearest=[];
    for(let k=0;k<468;k++){
      const d=(fp[k*3]-x)**2+(fp[k*3+1]-y)**2;
      if(nearest.length<5||d<nearest[nearest.length-1][0]){nearest.push([d,fp[k*3+2]]);nearest.sort((a,b)=>a[0]-b[0]);if(nearest.length>5)nearest.pop();}
    }
    let sum=0,weight=0;for(const [distance,depth] of nearest){const w=1/(distance+.00001);sum+=depth*w;weight+=w;}
    result[i]=x;result[i+2]=z+(sum/weight-.018-z)*amount;
  }
  return result;
}

export function photoProjection(x,y,z,p){
  const u=p.center+x/p.scale,v=p.eyeY-(y-.04595)/p.scale;
  const edge=clamp((.53-Math.abs(x))/.12,0,1),front=clamp((z-.12)/.22,0,1);
  const weight=edge*front*clamp((y+.64)/.08,0,1)*clamp((.50-y)/.12,0,1);
  return {u,v,weight:weight*(u>=0&&u<=1&&v>=0&&v<=1?1:0)};
}

export function createPortraitGroom(p,{segments=15}={}){
  const guides=1150,children=7,strandCount=guides*children,P=segments+1;
  const basePos=new Float32Array(strandCount*P*3),zoneIndices=new Uint8Array(strandCount),randomValues=new Float32Array(strandCount);
  let seed=27491;const random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;
  const mask=(x,y,z)=>y>(z>.25?.38:z<-.2?-.39:.04)?1:0;
  const zoneOf=(x,y,z)=>y>.76?3:z>.48?0:z<-.45?4:x<0?1:2;
  const topWorld=.04595+(p.eyeY-p.top)*p.scale;
  const volume=clamp(topWorld-.86,.045,.30),width=clamp(p.hairWidth*p.scale/2,.57,.92);
  let s=0;
  for(const d of sampleScalpDirections(guides,mask,random)){
    const n=new THREE.Vector3(d.x,d.y,d.z).normalize(),root=anatomicalScalp(n.x,n.y,n.z,new THREE.Vector3());
    const zone=zoneOf(n.x,n.y,n.z),front=zone===0||(zone===3&&root.z>0);
    const bin=clamp(Math.round(((p.center+root.x/p.scale-p.left)/p.faceWidth)*16),0,16);
    const targetY=.04595+(p.eyeY-p.fringe[bin])*p.scale;
    const drop=front?clamp(root.y-targetY,.12,.70):zone===3?.29:zone===4?.22:.21;
    const flow=new THREE.Vector3(front?-.12:root.x*.07,-1,front?.65:zone===4?-.25:0);
    flow.addScaledVector(n,-flow.dot(n)).normalize();
    const length=front?drop*.88:drop*(.65+random()*.4);
    for(let child=0;child<children;child++,s++){
      const phase=random()*Math.PI*2,spread=(child/(children-1)-.5)*.028;
      const follicle=root.clone().add(new THREE.Vector3(spread,0,(random()-.5)*.015));
      anatomicalScalp(follicle.x,follicle.y,follicle.z,follicle);
      for(let k=0;k<=segments;k++){
        const t=k/segments,l=length*(.90+child*.014)*t;
        const q=follicle.clone().addScaledVector(flow,l);
        q.y-=l*t*.10;
        const lift=.008+Math.sin(Math.PI*t*.85)*(zone===3?volume:zone===0?.055:.025);
        q.addScaledVector(n,lift);
        q.x+=Math.sin(phase+t*4)*.008*t;
        const sideLift=clamp(width-Math.abs(root.x),0,.12)*Math.abs(n.x)*Math.sin(t*Math.PI);
        q.x+=Math.sign(q.x)*sideLift;
        resolveHeadCollision(q,.007);
        const i=(s*P+k)*3;basePos[i]=q.x;basePos[i+1]=q.y;basePos[i+2]=q.z;
      }
      zoneIndices[s]=zone;randomValues[s]=random();
    }
  }
  return {basePos,zoneIndices,randomValues,strandCount,metadata:{groomId:'generated-portrait-short-v1',method:p.method,rear:'inferred-continuous-short-hair',measurements:{top:p.top,hairWidth:p.hairWidth,fringe:[...p.fringe]}}};
}

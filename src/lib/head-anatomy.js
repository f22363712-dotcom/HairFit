import * as THREE from 'three';
import {MeshBVH,acceleratedRaycast} from 'three-mesh-bvh';
import {headTemplate} from '../assets/head-template.js';

function geometry(data){
 const g=new THREE.BufferGeometry();
 g.setAttribute('position',new THREE.Float32BufferAttribute(data.positions,3));
 g.setIndex(data.indices);
 if(data.uvs)g.setAttribute('uv',new THREE.Float32BufferAttribute(data.uvs,2));
 if(data.normals)g.setAttribute('normal',new THREE.Float32BufferAttribute(data.normals,3));
 else g.computeVertexNormals();
 return g;
}
export const createAnatomicalHead=()=>geometry(headTemplate.head);
export const createAnatomicalEyes=()=>geometry(headTemplate.eyes);
export const eyeCenters=headTemplate.eyes.centers;

export function createHeadOcclusion(head,camera){
 head.geometry.boundsTree=new MeshBVH(head.geometry);
 head.raycast=acceleratedRaycast;
 const ray=new THREE.Raycaster(),direction=new THREE.Vector3();
 ray.firstHitOnly=true;
 return (x,y,z)=>{
  // Avoid a ray landing exactly on the template's mirrored center seam.
  direction.set(x+1e-6,y+1e-6,z).sub(camera.position);
  const distance=direction.length();if(distance<.006)return false;
  ray.set(camera.position,direction.divideScalar(distance));ray.far=distance-.006;
  return ray.intersectObject(head,false).length>0;
 };
}

/** Scalp-only radial lookup derived from the same mesh used for rendering. */
export function anatomicalScalp(x,y,z,out){
 const {longitude:w,latitude:h,radii}=headTemplate.scalp;
 const len=Math.hypot(x,y,z)||1;x/=len;y/=len;z/=len;
 const v=Math.acos(Math.max(-1,Math.min(1,y)))/Math.PI*h;
 const u=((Math.atan2(z,x)/(2*Math.PI)+1)%1)*w;
 const x0=Math.floor(u)%w,x1=(x0+1)%w,y0=Math.min(h,Math.floor(v)),y1=Math.min(h,y0+1);
 const a=u-Math.floor(u),b=v-y0;
 const r0=radii[y0*w+x0]*(1-a)+radii[y0*w+x1]*a;
 const r1=radii[y1*w+x0]*(1-a)+radii[y1*w+x1]*a;
 const r=r0*(1-b)+r1*b;
 return out.set(x*r,y*r,z*r);
}

const collisionSurface=new THREE.Vector3();
export function resolveHeadCollision(point,clearance=0,normal=null){
 const length=point.length();if(length<1e-6)return false;
 anatomicalScalp(point.x,point.y,point.z,collisionSurface);
 const radius=collisionSurface.length()+clearance;
 if(length>=radius)return false;
 if(normal)normal.copy(point).divideScalar(length);
 point.multiplyScalar(radius/length);return true;
}

export function createEyeMaterial(texture=null){
 const m=new THREE.MeshPhysicalMaterial({color:0xffffff,map:texture,alphaTest:texture ? 0.1 : 0,transparent:!!texture,roughness:.25,metalness:0,clearcoat:.15});
 if(texture)return m;
 m.onBeforeCompile=shader=>{
  shader.uniforms.eyeL={value:new THREE.Vector3(...eyeCenters[0])};
  shader.uniforms.eyeR={value:new THREE.Vector3(...eyeCenters[1])};
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vEyePos;').replace('#include <begin_vertex>','#include <begin_vertex>\nvEyePos=position;');
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vEyePos; uniform vec3 eyeL; uniform vec3 eyeR;').replace('#include <color_fragment>',`#include <color_fragment>
   vec3 center=vEyePos.x<0.0?eyeL:eyeR;
   float r=length(vEyePos.xy-center.xy);
   float iris=(1.0-smoothstep(0.038,0.044,r))*step(center.z,vEyePos.z);
   float pupil=1.0-smoothstep(0.017,0.021,r);
   vec3 brown=mix(vec3(0.10,0.048,0.025),vec3(0.025,0.017,0.012),smoothstep(0.025,0.043,r));
   diffuseColor.rgb=mix(diffuseColor.rgb,mix(brown,vec3(0.006),pupil),iris);`);
 };
 return m;
}

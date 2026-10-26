import * as THREE from 'three';
import { anatomicalScalp, resolveHeadCollision } from './head-anatomy.js';
import { sampleScalpDirections } from './scalp-sampling.js';
import { createGroomLock } from './groom-lock.js';

export const REFERENCE_GROOM_METADATA = {
  groomId: 'hairfit-ideal-swept-c-v1', reference: 'test-assets/hairstyle.jpg',
  method: 'manually-authored-reference-approximation', head: 'generic-MakeHuman-template',
  profileRevision: 'scalp-tangent-curvature-rootpatch-20261026', basis: 'root-scalp-tangent-v1',
  rear: 'reasonable-approximation-unobserved', arbitraryUploadReconstruction: false
};
export const REFERENCE_GROOM_FIBER_RADIUS=0.0015;

const profiles = {
  c: [[0,0,0],[-.10,.14,.012],[-.25,.28,.06],[-.43,.35,.13],[-.59,.28,.19],[-.64,.13,.19],[-.51,.02,.15],[-.36,.04,.10]],
  s: [[0,0,0],[-.10,.12,.012],[-.26,.28,.055],[-.43,.28,.12],[-.53,.16,.17],[-.42,.07,.16],[-.25,.12,.115],[-.13,.23,.07]],
  wave: [[0,0,0],[-.10,.09,.010],[-.27,.22,.04],[-.43,.21,.09],[-.49,.12,.13],[-.34,.07,.115],[-.21,.14,.06]]
};
export const REFERENCE_LOCK_PROFILES = profiles;

// Each record is an authored root, sweep, profile and size decision. Rear records
// are explicitly invented completions of the frontal reference, not inferred views.
const locks = [
  ['front-left-edge',[-.48,.62,.70],'wave',.50,30,'front',.048],
  ['front-left-sweep',[-.28,.64,.74],'s',.54,16,'front',.061],
  ['front-dominant-quiff',[-.07,.65,.76],'c',.45,12,'front',.070],
  ['front-center-sweep',[.16,.65,.74],'s',.61,5,'front',.066],
  ['front-right-curl',[.36,.64,.68],'c',.38,35,'front',.057],
  ['front-right-edge',[.52,.61,.61],'wave',.47,55,'front',.043],
  ['crown-front-left',[-.48,.85,.35],'c',.31,-12,'crown',.058],
  ['crown-front-midleft',[-.25,.94,.31],'s',.48,8,'crown',.065],
  ['crown-front-center',[0,.97,.27],'c',.32,10,'crown',.069],
  ['crown-front-midright',[.25,.94,.30],'wave',.52,28,'crown',.060],
  ['crown-front-right',[.48,.85,.34],'s',.43,42,'crown',.052],
  ['crown-rear-left',[-.46,.88,-.18],'s',.43,-24,'crown',.055],
  ['crown-rear-midleft',[-.22,.97,-.14],'c',.29,-18,'crown',.062],
  ['crown-rear-center',[.02,.995,-.10],'wave',.51,-8,'crown',.063],
  ['crown-rear-midright',[.27,.95,-.14],'c',.30,15,'crown',.058],
  ['crown-rear-right',[.48,.86,-.16],'s',.40,30,'crown',.050],
  ['left-upper-front',[-.75,.68,.26],'wave',.41,15,'left',.043],
  ['left-upper-mid',[-.77,.70,.04],'s',.35,5,'left',.041],
  ['left-upper-back',[-.76,.64,-.27],'wave',.36,-15,'left',.036],
  ['left-temple-transition',[-.84,.49,.27],'wave',.24,20,'left',.029],
  ['right-upper-front',[.74,.68,.27],'s',.35,-15,'right',.042],
  ['right-upper-mid',[.78,.70,.02],'wave',.39,-5,'right',.039],
  ['right-upper-back',[.75,.65,-.27],'s',.29,10,'right',.034],
  ['right-temple-transition',[.84,.49,.25],'wave',.23,-20,'right',.027],
  ['rear-left-high',[-.48,.74,-.60],'wave',.35,-22,'back',.041],
  ['rear-left-mid',[-.25,.69,-.74],'s',.31,-14,'back',.041],
  ['rear-center-high',[0,.83,-.55],'c',.27,-14,'back',.049],
  ['rear-right-mid',[.25,.69,-.73],'wave',.35,-35,'back',.037],
  ['rear-right-high',[.48,.74,-.60],'s',.31,-28,'back',.038],
  ['rear-center-transition',[.03,.56,-.83],'wave',.22,-10,'back',.027]
];
const zones = ['front','left','right','crown','back'];
const smooth = (a,b,x) => { const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t); };
const defaultMask = (x,y,z) => y > (z > 0 ? .34 : -.52) ? 1 : 0;
const defaultZone = (x,y,z) => { const a=Math.abs(Math.atan2(x,z))/Math.PI;return a<.26&&y<.9?'front':y>.72?'crown':a>.68?'back':x<0?'left':'right'; };

export function createGroomRootBasis(normal, zone, sweepDegrees = 0) {
  const flow = zone==='crown' ? new THREE.Vector3(0,-.10,1)
    : zone==='front' ? new THREE.Vector3(-.15,.60,-.70) : new THREE.Vector3(0,-.80,-.25);
  flow.addScaledVector(normal,-flow.dot(normal));
  if(flow.lengthSq()<1e-8){flow.set(1,0,0).addScaledVector(normal,-normal.x);}
  flow.normalize().applyAxisAngle(normal,sweepDegrees*Math.PI/180);
  const side=new THREE.Vector3().crossVectors(normal,flow).normalize();
  if((zone==='front'||zone==='crown')&&side.x<0)side.negate();
  return {flow,side};
}

function scalpSurfaceNormal(direction) {
  const a=new THREE.Vector3(1,0,0).addScaledVector(direction,-direction.x);
  if(a.lengthSq()<1e-8)a.set(0,0,1).addScaledVector(direction,-direction.z);
  a.normalize();const b=new THREE.Vector3().crossVectors(direction,a).normalize();
  const sample=tangent=>{
    const plus=direction.clone().addScaledVector(tangent,.001),minus=direction.clone().addScaledVector(tangent,-.001);
    return anatomicalScalp(plus.x,plus.y,plus.z,new THREE.Vector3()).sub(anatomicalScalp(minus.x,minus.y,minus.z,new THREE.Vector3()));
  };
  const normal=sample(a).cross(sample(b)).normalize();if(normal.dot(direction)<0)normal.negate();return normal;
}

export function createReferenceHeadGroom({ segments = 24, mask = defaultMask, classifyZone = defaultZone, collide = resolveHeadCollision } = {}) {
  const fibersPerLock = 176, underhairRoots = 1150, strandCount = locks.length * fibersPerLock + underhairRoots * 2;
  const basePos = new Float32Array(strandCount * (segments + 1) * 3);
  const zoneIndices = new Uint8Array(strandCount), widthScale = new Float32Array(strandCount).fill(1), randomValues = new Float32Array(strandCount);
  const pointWidthScale=new Float32Array(strandCount*(segments+1)).fill(1);
  let seed = 20261026;
  const random = () => ((seed = Math.imul(seed,1664525)+1013904223|0) >>> 0) / 4294967296;
  let strand = 0;
  const authored = [];
  for (let index=0;index<locks.length;index++) {
    const [name,anchor,profile,scale,heading,zone,radius] = locks[index];
    const normal = new THREE.Vector3(...anchor).normalize(), root = anatomicalScalp(normal.x,normal.y,normal.z,new THREE.Vector3());
    const {flow,side}=createGroomRootBasis(normal,zone,heading);
    const controlPoints = profiles[profile].map(offset => root.clone().addScaledVector(side,offset[0]*scale)
      .addScaledVector(flow,offset[1]*scale).addScaledVector(normal,offset[2]*scale).toArray());
    const data = createGroomLock({controlPoints,fiberCount:fibersPerLock,segments,radius,seed:300+index*37,zone,curvatureRatio:.25,packingFraction:.55,fiberRadius:REFERENCE_GROOM_FIBER_RADIUS});
    const rootPatchRadius=Math.min(.035,radius*.65),goldenAngle=Math.PI*(3-Math.sqrt(5));
    for(let fiber=0;fiber<fibersPerLock;fiber++,strand++) {
      const distance=Math.sqrt((fiber+.5)/fibersPerLock)*rootPatchRadius,angle=fiber*goldenAngle+index*.61;
      const follicle=root.clone().addScaledVector(side,Math.cos(angle)*distance).addScaledVector(flow,Math.sin(angle)*distance*.72);
      anatomicalScalp(follicle.x,follicle.y,follicle.z,follicle);
      follicle.multiplyScalar((follicle.length()+.006)/follicle.length());
      const previousRoot=new THREE.Vector3().fromArray(data.basePos,fiber*(segments+1)*3);collide(previousRoot,.006);
      const correction=follicle.clone().sub(previousRoot);
      for(let step=0;step<=segments;step++) {
        const from=(fiber*(segments+1)+step)*3, to=(strand*(segments+1)+step)*3;
        const point=new THREE.Vector3(data.basePos[from],data.basePos[from+1],data.basePos[from+2]);
        collide(point,.006);
        if(step/segments<.25){
          if(!step)point.copy(follicle);
          else{
            const follower=point.clone().add(correction);anatomicalScalp(follower.x,follower.y,follower.z,follower);
            follower.multiplyScalar((follower.length()+.006)/follower.length());
            const t=step/segments/.25,blend=t*t*t*(t*(t*6-15)+10);
            point.lerpVectors(follower,point,blend);collide(point,.006);
          }
        }
        point.toArray(basePos,to);
        pointWidthScale[strand*(segments+1)+step]=data.pointWidthScale[fiber*(segments+1)+step];
      }
      zoneIndices[strand]=zones.indexOf(zone);randomValues[strand]=(data.colors[fiber]-.92)/.16;
    }
    authored.push({name,zone,profile,anchor,scale,flowAngle:heading,radius,curvatureRatio:.25,packingFraction:.55,rootPatchRadius,rootBlendEnd:.25,rootBlend:'surface-follower-quintic',rootClearance:.006,effectiveRadiusMin:data.metadata.minimumBundleRadius,effectiveRadiusMax:data.metadata.maximumBundleRadius,flow:flow.toArray(),side:side.toArray(),normal:normal.toArray(),controlPoints});
  }
  for(const direction of sampleScalpDirections(underhairRoots,mask,random)) {
    const normal=new THREE.Vector3(direction.x,direction.y,direction.z), zone=classifyZone(normal.x,normal.y,normal.z);
    const root=anatomicalScalp(normal.x,normal.y,normal.z,new THREE.Vector3());
    const flow=zone==='front'?new THREE.Vector3(-1,.06,-.12):new THREE.Vector3(0,-1,-.04);
    const flowNormal=zone==='front'?scalpSurfaceNormal(normal):normal;
    flow.addScaledVector(flowNormal,-flow.dot(flowNormal));if(flow.lengthSq()<1e-6)flow.set(0,0,1);flow.normalize();
    const side=new THREE.Vector3().crossVectors(normal,flow).normalize();
    const high=smooth(.05,.84,normal.y), length=zone==='front'?.075:.025+.15*Math.pow(high,1.35);
    for(let child=0;child<2;child++,strand++) {
      const point=root.clone().addScaledVector(side,(child-.5)*.012);
      collide(point,.006);
      for(let step=0;step<=segments;step++) {
        if(step){point.addScaledVector(flow,length/segments);collide(point,.006);}
        point.toArray(basePos,(strand*(segments+1)+step)*3);
      }
      zoneIndices[strand]=zones.indexOf(zone);randomValues[strand]=random();widthScale[strand]=zone==='front'?.9:.0022*.9/REFERENCE_GROOM_FIBER_RADIUS;
    }
  }
  return {basePos,zoneIndices,widthScale,pointWidthScale,randomValues,strandCount,segments,metadata:{...REFERENCE_GROOM_METADATA,fiberRadius:REFERENCE_GROOM_FIBER_RADIUS,
    primaryLocks:authored,primaryFibersPerLock:fibersPerLock,underhairStrands:underhairRoots*2}};
}

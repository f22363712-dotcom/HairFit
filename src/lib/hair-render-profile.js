import * as THREE from 'three';
import { sampleVisiblePoint, writeRibbonStrand } from './haircut-geometry.js';
import { createRoundHairLayout, createRoundStrandWriter } from './groom-round-geometry.js';
import { createReferenceHeadGroom } from './groom-head.js';
import { createRoundGroomMaterial } from './groom-material.js';

export function selectHairRenderProfile(options = {}) {
  const experimental=options.experimentalGroom===true;
  return {experimental,name:experimental?'round-groom-experiment':'ribbon',segments:experimental?24:15,sides:experimental?3:2,indicesPerSegment:experimental?18:6};
}

/** Select topology before allocation; the default has no reference bake callable. */
export function createHairRenderStorage(strandCapacity, profile = selectHairRenderProfile()) {
  const segments=profile.segments,sides=profile.sides,points=segments+1;
  if(profile.experimental){
    const layout=createRoundHairLayout(strandCapacity,segments,sides);
    return {profile,indices:layout.indices,write:createRoundStrandWriter(layout),bakeCrop:createReferenceHeadGroom,
      attributes:{position:{array:layout.positions,itemSize:3},normal:{array:layout.normals,itemSize:3},tangent:{array:layout.tangents,itemSize:4},
        aT:{array:layout.progress,itemSize:1},aRand:{array:layout.random,itemSize:1},aRadius:{array:layout.radii,itemSize:1},uv:{array:layout.uv,itemSize:2}},
      createMaterial:options=>createRoundGroomMaterial(options)};
  }
  const vertices=strandCapacity*points*2;
  const position=new Float32Array(vertices*3),tangent=new Float32Array(vertices*3),side=new Float32Array(vertices),progress=new Float32Array(vertices),randoms=new Float32Array(vertices);
  const indices=new Uint32Array(strandCapacity*segments*6);
  for(let strand=0;strand<strandCapacity;strand++)for(let step=0;step<segments;step++){
    const a=(strand*points+step)*2,offset=(strand*segments+step)*6;
    indices.set([a,a+1,a+2,a+1,a+3,a+2],offset);
  }
  const a={x:0,y:0,z:0},b={x:0,y:0,z:0};
  function write(base,strand,cut,random=.5){
    writeRibbonStrand(base,position,progress,strand,segments,cut);
    let tx=0,ty=1,tz=0;
    for(let step=0;step<=segments;step++){
      sampleVisiblePoint(base,strand,segments,cut,Math.max(0,step-1),a);
      sampleVisiblePoint(base,strand,segments,cut,Math.min(segments,step+1),b);
      const x=b.x-a.x,y=b.y-a.y,z=b.z-a.z,length=Math.hypot(x,y,z);
      if(length>1e-8){tx=x/length;ty=y/length;tz=z/length;}
      for(let edge=0;edge<2;edge++){
        const vertex=(strand*points+step)*2+edge;
        tangent[vertex*3]=tx;tangent[vertex*3+1]=ty;tangent[vertex*3+2]=tz;side[vertex]=edge?1:-1;randoms[vertex]=random;
      }
    }
  }
  return {profile,indices,write,bakeCrop:null,
    attributes:{position:{array:position,itemSize:3},aTangent:{array:tangent,itemSize:3},aSide:{array:side,itemSize:1},aT:{array:progress,itemSize:1},aRand:{array:randoms,itemSize:1}},
    createMaterial:({root=0x1e130c,tip=0x5c3a24,vertexShader,fragmentShader,keyDir,rimDir})=>new THREE.ShaderMaterial({
      uniforms:{uWidth:{value:.0032},uRoot:{value:new THREE.Color(root)},uTip:{value:new THREE.Color(tip)},uLightDir:{value:keyDir.clone()},uLightDir2:{value:rimDir.clone()}},
      vertexShader,fragmentShader,side:THREE.DoubleSide
    })};
}

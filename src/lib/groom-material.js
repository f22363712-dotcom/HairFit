import * as THREE from 'three';

export function createGroomMaterial(representation = 'tube3') {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.52, metalness: 0,
    anisotropy: 0.62, anisotropyRotation: 0, specularIntensity: 0.50,
    sheen: 0.22, sheenColor: new THREE.Color(0x49301e), sheenRoughness: 0.65,
    clearcoat: 0, side: representation === 'crossed' ? THREE.DoubleSide : THREE.FrontSide
  });
}

/** Expand preallocated center vertices along their transported radial normals. */
export function createRoundGroomMaterial({ root = 0x1e130c, tip = 0x5c3a24, width = 0.0022 } = {}) {
  const material = createGroomMaterial('tube3');
  material.vertexColors = false;
  material.envMapIntensity = 0.35;
  // Keep the production asynchronous appearance interface stable.
  material.uniforms = {
    uRoot: { value: new THREE.Color(root) }, uTip: { value: new THREE.Color(tip) }, uWidth: { value: width }
  };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, material.uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aRadius; attribute float aT; attribute float aRand; uniform float uWidth; varying float vGroomT; varying float vGroomRand;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += normal * (uWidth * aRadius); vGroomT=aT; vGroomRand=aRand;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRoot; uniform vec3 uTip; varying float vGroomT; varying float vGroomRand;')
      .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= mix(uRoot,uTip,0.35+0.45*smoothstep(0.0,1.0,vGroomT))*(0.94+0.12*vGroomRand);');
  };
  material.customProgramCacheKey = () => 'hairfit-round-groom-centers-v1';
  return material;
}

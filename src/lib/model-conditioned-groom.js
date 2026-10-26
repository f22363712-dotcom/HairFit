import * as THREE from 'three';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

// Flow is inferred on the selected mesh's own surface. No authored haircut curves.
const SEGMENTS = 10, SIDES = 5, MAX_BUNDLES = 1050, MAX_FALLING = 96;
const clamp = THREE.MathUtils.clamp;

class MinHeap {
  items = [];
  push(value) { const a = this.items; a.push(value); let i = a.length - 1; while (i) { const p = (i - 1) >> 1; if (a[p][0] <= value[0]) break; a[i] = a[p]; i = p; } a[i] = value; }
  pop() { const a = this.items, result = a[0], last = a.pop(); if (a.length) { let i = 0; while (i * 2 + 1 < a.length) { let j = i * 2 + 1; if (j + 1 < a.length && a[j + 1][0] < a[j][0]) j++; if (last[0] <= a[j][0]) break; a[i] = a[j]; i = j; } a[i] = last; } return result; }
}

function surfaceGraph(geometry) {
  const attr = geometry?.attributes?.position;
  if (!attr || attr.count < 3 || attr.count > 1000000) throw new RangeError('Hair surface requires 3 to 1000000 vertices');
  const bounds = new THREE.Box3().setFromBufferAttribute(attr), size = bounds.getSize(new THREE.Vector3());
  const scale = Math.max(size.x, size.y, size.z);
  if (!(scale > 1e-6) || !Number.isFinite(scale)) throw new RangeError('Hair surface bounds must be finite and nonzero');
  const vertices = [], welded = new Map(), ids = new Uint32Array(attr.count), quantum = scale * 1e-5;
  for (let i = 0; i < attr.count; i++) {
    const p = new THREE.Vector3().fromBufferAttribute(attr, i);
    if (![p.x, p.y, p.z].every(Number.isFinite)) throw new RangeError('Hair surface positions must be finite');
    const key = `${Math.round(p.x / quantum)},${Math.round(p.y / quantum)},${Math.round(p.z / quantum)}`;
    let id = welded.get(key);
    if (id === undefined) { id = vertices.length; welded.set(key, id); vertices.push({ p, n: new THREE.Vector3(), adjacent: new Set() }); }
    ids[i] = id;
  }
  const index = geometry.index, count = index?.count ?? attr.count;
  let area = 0;
  const ab = new THREE.Vector3(), ac = new THREE.Vector3(), normal = new THREE.Vector3();
  for (let i = 0; i + 2 < count; i += 3) {
    const a = ids[index ? index.getX(i) : i], b = ids[index ? index.getX(i + 1) : i + 1], c = ids[index ? index.getX(i + 2) : i + 2];
    if ([a,b,c].some(id => id === undefined)) throw new RangeError('Invalid hair triangle');
    normal.crossVectors(ab.subVectors(vertices[b].p, vertices[a].p), ac.subVectors(vertices[c].p, vertices[a].p));
    area += normal.length() * 0.5;
    for (const [u,v,w] of [[a,b,c],[b,c,a],[c,a,b]]) { vertices[u].n.add(normal); vertices[u].adjacent.add(v); vertices[u].adjacent.add(w); }
  }
  vertices.forEach(v => v.n.normalize());
  return { vertices, bounds, scale, area };
}

function inferGuides(graph) {
  const { vertices, scale, bounds } = graph, count = vertices.length;
  const distances = new Float64Array(count).fill(Infinity), parent = new Int32Array(count).fill(-1), heap = new MinHeap();
  // Give each disconnected component its own highest surface root, never bridge empty space.
  const seen = new Uint8Array(count);
  for (let start = 0; start < count; start++) {
    if (seen[start]) continue;
    const stack = [start], component = []; seen[start] = 1; let highest = start;
    while (stack.length) { const id = stack.pop(); component.push(id); if (vertices[id].p.y > vertices[highest].p.y) highest = id; for (const next of vertices[id].adjacent) if (!seen[next]) { seen[next] = 1; stack.push(next); } }
    const top = vertices[highest].p.y;
    for (const id of component) if (vertices[id].p.y >= top - scale * 0.012) { distances[id] = 0; heap.push([0,id]); }
  }
  while (heap.items.length) {
    const [distance,id] = heap.pop(); if (distance !== distances[id]) continue;
    for (const next of vertices[id].adjacent) {
      const step = vertices[id].p.distanceTo(vertices[next].p);
      const candidate = distance + step;
      if (candidate < distances[next]) { distances[next] = candidate; parent[next] = id; heap.push([candidate,next]); }
    }
  }
  // Spatial stratification avoids density changes caused only by GLB tessellation.
  let cell = scale / 34, candidates;
  do {
    const cells = new Map();
    for (let id = 0; id < count; id++) {
      if (distances[id] < scale * 0.025 || !Number.isFinite(distances[id])) continue;
      const p = vertices[id].p;
      const key = `${Math.floor((p.x-bounds.min.x)/cell)},${Math.floor((p.y-bounds.min.y)/cell)},${Math.floor((p.z-bounds.min.z)/cell)}`;
      const previous = cells.get(key);
      if (previous === undefined || distances[id] > distances[previous]) cells.set(key,id);
    }
    candidates = [...cells.values()]; cell *= 1.08;
  } while (candidates.length > MAX_BUNDLES);
  const guides = [];
  for (const id of candidates) {
    const path = []; let next = id;
    while (next >= 0 && path.length <= count) { const v = vertices[next]; path.push(v.p.clone().addScaledVector(v.n, scale * 0.001)); next = parent[next]; }
    path.reverse(); if (path.length < 2) continue;
    const curve = new THREE.CatmullRomCurve3(path, false, 'centripetal');
    const points = curve.getSpacedPoints(SEGMENTS);
    guides.push({ points, length: 1, phase: (id * 0.61803398875 % 1) * Math.PI * 2 });
  }
  if (guides.length < 2) throw new RangeError('Hair surface has insufficient connected area');
  return guides;
}

function makeGeometry(count) {
  const geometry = new THREE.BufferGeometry(), vertices = count * (SEGMENTS + 1) * SIDES;
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices * 3), 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(vertices * 3), 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(vertices * 3), 3));
  geometry.setAttribute('flowT', new THREE.BufferAttribute(new Float32Array(vertices), 1));
  geometry.setAttribute('flowPhase', new THREE.BufferAttribute(new Float32Array(vertices), 1));
  const indices = [];
  for (let b = 0; b < count; b++) for (let s = 0; s < SEGMENTS; s++) for (let j = 0; j < SIDES; j++) {
    const a = (b * (SEGMENTS + 1) + s) * SIDES + j, d = (b * (SEGMENTS + 1) + s) * SIDES + (j + 1) % SIDES;
    indices.push(a,d,a+SIDES,d,d+SIDES,a+SIDES);
  }
  geometry.setIndex(indices); return geometry;
}

function at(points, t, target) { const f = clamp(t,0,1) * SEGMENTS, a = Math.min(SEGMENTS - 1, Math.floor(f)); return target.copy(points[a]).lerp(points[a + 1], f - a); }

function writeTube(geometry, bundle, points, start, end, width, phase) {
  const position = geometry.attributes.position, normal = geometry.attributes.normal, colors = geometry.attributes.color;
  const p = new THREE.Vector3(), tangent = new THREE.Vector3(), n = new THREE.Vector3(), binormal = new THREE.Vector3(), radial = new THREE.Vector3();
  const c = new THREE.Color();
  for (let s = 0; s <= SEGMENTS; s++) {
    const t = s / SEGMENTS, sourceT = start + (end-start)*t;
    at(points, sourceT, p);
    tangent.subVectors(at(points, Math.min(1,sourceT+0.015), new THREE.Vector3()), at(points, Math.max(0,sourceT-0.015), new THREE.Vector3())).normalize();
    if (tangent.lengthSq() < 0.5) tangent.set(0,1,0);
    n.set(0,0,1); if (Math.abs(tangent.z) > 0.9) n.set(1,0,0);
    n.addScaledVector(tangent,-n.dot(tangent)).normalize(); binormal.crossVectors(tangent,n).normalize();
    const radius = width * (0.96 - 0.88 * Math.pow(t,1.7));
    c.setRGB(0.034,0.021,0.015).multiplyScalar((0.9 + 0.12*Math.sin(phase)) * (0.7+0.45*t));
    for (let j = 0; j < SIDES; j++) {
      const vertex = (bundle*(SEGMENTS+1)+s)*SIDES+j, angle = j/SIDES*Math.PI*2;
      radial.copy(n).multiplyScalar(Math.cos(angle)).addScaledVector(binormal,Math.sin(angle));
      position.setXYZ(vertex,p.x+radius*radial.x,p.y+radius*radial.y,p.z+radius*radial.z);
      normal.setXYZ(vertex,radial.x,radial.y,radial.z); colors.setXYZ(vertex,c.r,c.g,c.b);
      geometry.attributes.flowT.setX(vertex,t); geometry.attributes.flowPhase.setX(vertex,phase);
    }
  }
}

/** Coordinates and brush radius are in the normalized reconstruction's world units. */
export function createModelConditionedGroom(hairGeometry, { headGeometries = [] } = {}) {
  const graph = surfaceGraph(hairGeometry), guides = inferGuides(graph), scale = graph.scale;
  const totalLength = guides.reduce((sum,g) => sum + g.points.slice(1).reduce((n,p,i) => n+p.distanceTo(g.points[i]),0),0);
  // Broad volumetric fibers keep the inferred envelope visually continuous over
  // sparse source tessellation while remaining a single capped draw call.
  const width = clamp(graph.area / Math.max(totalLength,scale) * 1.8, scale*0.018,scale*0.06);
  // Match the supplied head, not a template ellipsoid. Project near-head guide points outward.
  const heads = headGeometries.map(source => {
    const geometry = source.clone(); geometry.boundsTree = new MeshBVH(geometry);
    const mesh = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    mesh.raycast = acceleratedRaycast; return mesh;
  });
  const headBounds = new THREE.Box3(); heads.forEach(head => { head.updateMatrixWorld(); headBounds.union(new THREE.Box3().setFromBufferAttribute(head.geometry.attributes.position)); });
  const headCenter = headBounds.isEmpty() ? graph.bounds.getCenter(new THREE.Vector3()) : headBounds.getCenter(new THREE.Vector3());
  const probe = new THREE.Raycaster(), direction = new THREE.Vector3();
  if (heads.length) for (const guide of guides) for (const point of guide.points) {
    direction.subVectors(point,headCenter); const distance = direction.length(); if (distance < 1e-8) continue;
    probe.set(headCenter,direction.normalize()); probe.far = distance + width*3;
    const hits = probe.intersectObjects(heads,false);
    if (hits.length && hits[0].distance + width*1.2 > distance) point.copy(headCenter).addScaledVector(direction,hits[0].distance+width*1.2);
  }
  heads.forEach(head => { head.material.dispose(); head.geometry.dispose(); });
  const group = new THREE.Group(); group.name = 'model-conditioned-bundles';
  const geometry = makeGeometry(guides.length), material = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness:0.43, metalness:0, sheen:0.3, sheenColor: new THREE.Color(0x60432f), sheenRoughness:0.5 });
  const uniforms = { groomTime: { value:0 }, groomSway: { value:scale*0.002 } };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float flowT; attribute float flowPhase; uniform float groomTime; uniform float groomSway;').replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.x += sin(groomTime*1.6+flowPhase)*groomSway*flowT*flowT; transformed.z += cos(groomTime*1.3+flowPhase)*groomSway*0.5*flowT*flowT;');
  };
  material.customProgramCacheKey = () => 'model-surface-groom-v1';
  const mesh = new THREE.Mesh(geometry,material); mesh.name='attached-model-bundles'; group.add(mesh);
  const fallingGeometry = makeGeometry(MAX_FALLING), fallingMaterial = material.clone();
  fallingMaterial.onBeforeCompile = () => {}; // detached material uses gravity, no root sway
  const fallingMesh = new THREE.Mesh(fallingGeometry,fallingMaterial); fallingMesh.name='falling-model-tips'; fallingMesh.frustumCulled=false; group.add(fallingMesh); fallingGeometry.setDrawRange(0,0);
  let falling = [], disposed = false, lastTime = null, clock = 0;
  const stats = { bundleCount:guides.length, triangleCount:guides.length*SEGMENTS*SIDES*2, segments:SEGMENTS, sides:SIDES, detachedBundleCount:0, trimmedBundles:0 };
  function refresh() {
    guides.forEach((g,i) => writeTube(geometry,i,g.points,0,g.length,width,g.phase));
    geometry.attributes.position.needsUpdate=true; geometry.attributes.normal.needsUpdate=true; geometry.computeBoundingSphere();
  }
  refresh();
  function refreshFalling() {
    const p = fallingGeometry.attributes.position;
    falling.forEach((f,i) => {
      writeTube(fallingGeometry,i,f.points,0,1,width,f.phase);
      const offsetX = Math.sin(f.phase)*scale*0.09*f.age, offsetY = -scale*0.8*f.age*f.age, offsetZ = Math.cos(f.phase)*scale*0.06*f.age;
      for (let v=i*(SEGMENTS+1)*SIDES; v<(i+1)*(SEGMENTS+1)*SIDES; v++) p.setXYZ(v,p.getX(v)+offsetX,p.getY(v)+offsetY,p.getZ(v)+offsetZ);
    });
    p.needsUpdate=true; fallingGeometry.attributes.normal.needsUpdate=true;
    fallingGeometry.setDrawRange(0,falling.length*SEGMENTS*SIDES*6); stats.detachedBundleCount=falling.length;
  }
  function cut(raycaster,radius) {
    const started = performance.now(), result = { affectedStrands:0,zone:'none',durationMs:0 };
    if (disposed || !raycaster?.ray || !(radius>0) || !Number.isFinite(radius)) return result;
    group.updateWorldMatrix(true,false);
    const inverse = group.matrixWorld.clone().invert(), ray = raycaster.ray.clone().applyMatrix4(inverse);
    const worldScale = group.getWorldScale(new THREE.Vector3()).x || 1, localRadius = radius/worldScale;
    const onRay = new THREE.Vector3(), onSegment = new THREE.Vector3(), end = new THREE.Vector3();
    let nearest=Infinity, hit=null;
    for (const g of guides) for (let s=0;s<SEGMENTS;s++) {
      const t0=s/SEGMENTS, t1=Math.min(g.length,(s+1)/SEGMENTS); if (t0>=g.length) break;
      at(g.points,t1,end);
      const d=ray.distanceSqToSegment(g.points[s],end,onRay,onSegment), depth=onRay.distanceTo(ray.origin)*worldScale;
      if (d<Math.pow(width+localRadius*0.15,2) && depth>=raycaster.near && depth<=raycaster.far && depth<nearest) { nearest=depth; hit=onSegment.clone(); }
    }
    if (!hit) return { ...result,durationMs:performance.now()-started };
    for (const g of guides) {
      let shorten=g.length;
      for (let s=0;s<SEGMENTS;s++) {
        const t0=s/SEGMENTS, t1=Math.min(g.length,(s+1)/SEGMENTS); if (t0>=g.length) break;
        const a=g.points[s], b=at(g.points,t1,end), delta=new THREE.Vector3().subVectors(b,a), rel=new THREE.Vector3().subVectors(a,hit);
        const A=delta.lengthSq(), B=2*rel.dot(delta), C=rel.lengthSq()-localRadius*localRadius, discriminant=B*B-4*A*C;
        if (A<1e-12 || discriminant<0) continue;
        const entry=(-B-Math.sqrt(discriminant))/(2*A), exit=(-B+Math.sqrt(discriminant))/(2*A);
        if (exit<0 || entry>1) continue;
        const t=Math.max(t0+(t1-t0)*Math.max(0,entry),g.length*0.7);
        if (t>t0+(t1-t0)*Math.min(1,exit)) continue;
        const cutPoint=at(g.points,t,new THREE.Vector3()).applyMatrix4(group.matrixWorld);
        const depth=cutPoint.sub(raycaster.ray.origin).dot(raycaster.ray.direction);
        if (depth<raycaster.near || depth>raycaster.far) continue;
        // Protect a small proximal section, including its immutable root.
        if (t>0.12 && t<shorten-0.012) { shorten=t; break; }
      }
      if (shorten<g.length) {
        const points=Array.from({length:SEGMENTS+1},(_,i) => at(g.points,shorten+(g.length-shorten)*i/SEGMENTS,new THREE.Vector3()));
        if (falling.length>=MAX_FALLING) falling.shift(); falling.push({points,phase:g.phase,age:0});
        g.length=shorten; result.affectedStrands++;
      }
    }
    if (result.affectedStrands) {
      stats.trimmedBundles=guides.filter(g=>g.length<1).length; refresh(); refreshFalling();
      const angle=Math.abs(Math.atan2(hit.x-headCenter.x,hit.z-headCenter.z));
      result.zone=hit.y>0.75?'crown':angle<Math.PI/4?'front':angle>3*Math.PI/4?'back':hit.x<headCenter.x?'left':'right';
    }
    result.durationMs=performance.now()-started; return result;
  }
  return {
    group,stats,cut,
    step(timeMs) {
      if (disposed || !Number.isFinite(timeMs)) return false;
      const dt=lastTime===null?0:clamp((timeMs-lastTime)/1000,0,0.05); lastTime=timeMs; clock+=dt; uniforms.groomTime.value=clock;
      if (falling.length) { falling.forEach(f=>{f.age+=dt;}); falling=falling.filter(f=>f.age<1.4); refreshFalling(); }
      return true;
    },
    reset() { if (disposed) return; guides.forEach(g=>{g.length=1;}); falling=[]; lastTime=null; clock=0; uniforms.groomTime.value=0; stats.trimmedBundles=0; refresh(); refreshFalling(); },
    dispose() { if (disposed) return; disposed=true; falling=[]; geometry.dispose(); fallingGeometry.dispose(); material.dispose(); fallingMaterial.dispose(); group.clear(); }
  };
}

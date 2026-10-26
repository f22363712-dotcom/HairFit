import * as THREE from 'three';
import { sampleVisiblePoint, nextCutPosition } from './haircut-geometry.js';

// Original ideal reference: raised C/S body with the tip swept back sideways.
// Coordinates are manually authored local groom coordinates, not photo fitting.
export const IDEAL_LOCK_POINTS = [
  [0.05, -0.50, -0.06], [0.02, -0.29, 0.02], [-0.02, -0.04, 0.12],
  [-0.10, 0.22, 0.19], [-0.27, 0.40, 0.16], [-0.47, 0.37, 0.04],
  [-0.55, 0.20, -0.07], [-0.43, 0.08, -0.13], [-0.25, 0.13, -0.10],
  [-0.18, 0.22, -0.02]
];
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const seededRandom = seed => {
  let state = seed;
  return () => {
    state |= 0; state = state + 0x6d2b79f5 | 0;
    let t = Math.imul(state ^ state >>> 15, 1 | state);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

/** Parallel transport avoids the frame flips produced by an arbitrary up axis. */
function transportFrames(points) {
  const tangents = [], normals = [], binormals = [];
  const rotation = new THREE.Quaternion();
  for (let index = 0; index < points.length; index++) {
    const tangent = new THREE.Vector3().subVectors(points[Math.min(points.length - 1, index + 1)], points[Math.max(0, index - 1)]);
    if (tangent.lengthSq() < 1e-12) tangent.copy(tangents[index - 1] || new THREE.Vector3(0, 1, 0));
    tangent.normalize();
    let normal;
    if (index === 0) {
      normal = new THREE.Vector3(0, 0, 1);
      if (Math.abs(normal.dot(tangent)) > 0.9) normal.set(1, 0, 0);
    } else {
      rotation.setFromUnitVectors(tangents[index - 1], tangent);
      normal = normals[index - 1].clone().applyQuaternion(rotation);
    }
    normal.addScaledVector(tangent, -normal.dot(tangent)).normalize();
    tangents.push(tangent); normals.push(normal);
    binormals.push(new THREE.Vector3().crossVectors(tangent, normal).normalize());
  }
  return { tangents, normals, binormals };
}

export function createGroomLock({ controlPoints = IDEAL_LOCK_POINTS, fiberCount = 192, segments = 24, radius = 0.075, seed = 83, zone = 'crown', curvatureRatio = null, packingFraction = null, fiberRadius = 0.0022 } = {}) {
  if (!Number.isInteger(fiberCount) || fiberCount < 1 || !Number.isInteger(segments) || segments < 3) throw new RangeError('Invalid groom sampling budget');
  const curve = new THREE.CatmullRomCurve3(controlPoints.map(point => new THREE.Vector3(...point)), false, 'centripetal');
  const frameSteps = Math.max(128, segments * 4);
  const framePoints = curve.getSpacedPoints(frameSteps);
  const frames = transportFrames(framePoints);
  const curvatureRadii=new Float64Array(frameSteps+1).fill(Infinity);
  if(curvatureRatio){
    const a=new THREE.Vector3(),b=new THREE.Vector3(),chord=new THREE.Vector3(),cross=new THREE.Vector3();
    for(let index=1;index<frameSteps;index++){
      a.subVectors(framePoints[index],framePoints[index-1]);b.subVectors(framePoints[index+1],framePoints[index]);chord.subVectors(framePoints[index+1],framePoints[index-1]);
      const twiceArea=cross.crossVectors(a,b).length();
      if(twiceArea>1e-14)curvatureRadii[index]=a.length()*b.length()*chord.length()/(2*twiceArea);
    }
    curvatureRadii[0]=curvatureRadii[1];curvatureRadii[frameSteps]=curvatureRadii[frameSteps-1];
  }
  const random = seededRandom(seed), goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const basePos = new Float32Array(fiberCount * (segments + 1) * 3);
  const colors = new Float32Array(fiberCount);
  const pointWidthScale=new Float32Array(fiberCount*(segments+1)).fill(1);
  let minimumBundleRadius=Infinity,maximumBundleRadius=0;
  for (let fiber = 0; fiber < fiberCount; fiber++) {
    const diskRadius = Math.sqrt((fiber + 0.5) / fiberCount);
    const angle = fiber * goldenAngle + (random() - 0.5) * 0.10;
    const lengthScale = 0.90 + random() * 0.10;
    const phase = random() * Math.PI * 2;
    colors[fiber] = 0.92 + random() * 0.16;
    for (let step = 0; step <= segments; step++) {
      const t = step / segments, u = t * lengthScale;
      const frameIndex = Math.min(frameSteps - 1, Math.floor(u * frameSteps));
      const blend = u * frameSteps - frameIndex;
      const normal = frames.normals[frameIndex].clone().lerp(frames.normals[frameIndex + 1], blend).normalize();
      const binormal = frames.binormals[frameIndex].clone().lerp(frames.binormals[frameIndex + 1], blend).normalize();
      const envelope = (0.65 + 0.35 * Math.sin(t * Math.PI)) * (1 - 0.88 * smooth(0.68, 1, t));
      const localCurvature=Math.min(curvatureRadii[frameIndex],curvatureRadii[frameIndex+1]);
      const bundleRadius=curvatureRatio?Math.min(radius*envelope,localCurvature*curvatureRatio):radius*envelope;
      const spread = bundleRadius * diskRadius;
      minimumBundleRadius=Math.min(minimumBundleRadius,bundleRadius);maximumBundleRadius=Math.max(maximumBundleRadius,bundleRadius);
      if(packingFraction)pointWidthScale[fiber*(segments+1)+step]=Math.min(1,bundleRadius*Math.sqrt(packingFraction*.78/fiberCount)/fiberRadius);
      const twist = angle + 0.07 * Math.sin(t * 4 + phase);
      const point = curve.getPointAt(u)
        .addScaledVector(normal, Math.cos(twist) * spread)
        .addScaledVector(binormal, Math.sin(twist) * spread * 0.78);
      const offset = (fiber * (segments + 1) + step) * 3;
      point.toArray(basePos, offset);
    }
  }
  return {
    basePos, colors, pointWidthScale, fiberCount, segments,
    zoneIndices: new Uint8Array(fiberCount).fill(['front', 'left', 'right', 'crown', 'back'].indexOf(zone)),
    metadata: {
      reference: 'test-assets/hairstyle.jpg', secondaryReference: 'test-assets/last-generated-preview.png',
      method: 'manually-authored-reference-approximation', zone, seed, radius,
      rear: 'Not observed in the frontal reference; no rear reconstruction is claimed',
      units: 'virtual world units, not measured physical hair length',
      fiberRadius,curvatureRatio,packingFraction,minimumBundleRadius,maximumBundleRadius,
      controlPoints: controlPoints.map(point => [...point])
    }
  };
}

/** Actual round fibers or world-fixed crossed strips; neither faces the camera. */
export function createGroomFiberGeometry(data, { representation = 'tube3', fiberRadius = data.metadata.fiberRadius||0.0022, cuts = null } = {}) {
  const { fiberCount, segments, basePos } = data;
  const sides = representation === 'tube3' ? 3 : 4, crossed = representation === 'crossed';
  const vertexCount = fiberCount * (segments + 1) * sides;
  const positions = new Float32Array(vertexCount * 3), normals = new Float32Array(vertexCount * 3);
  const tangents = new Float32Array(vertexCount * 4), colors = new Float32Array(vertexCount * 3), uv = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(fiberCount * segments * (crossed ? 12 : sides * 6));
  const point = { x: 0, y: 0, z: 0 }, hairColor = new THREE.Color(0x49301e), color = new THREE.Color();
  let indexOffset = 0;
  for (let fiber = 0; fiber < fiberCount; fiber++) {
    const cut = cuts ? cuts[fiber] : segments;
    const points = [];
    for (let step = 0; step <= segments; step++) {
      sampleVisiblePoint(basePos, fiber, segments, cut, step, point);
      points.push(new THREE.Vector3(point.x, point.y, point.z));
    }
    const frames = transportFrames(points);
    for (let step = 0; step <= segments; step++) {
      const t = Math.min(1, step / Math.max(0.5, cut));
      const visibleStep=Math.min(cut,step),lo=Math.floor(visibleStep),hi=Math.min(segments,lo+1),blend=visibleStep-lo;
      const localWidth=data.pointWidthScale?data.pointWidthScale[fiber*(segments+1)+lo]*(1-blend)+data.pointWidthScale[fiber*(segments+1)+hi]*blend:1;
      const width = fiberRadius * localWidth * Math.pow(Math.max(0, 1 - smooth(0.58, 1, t)), 0.85) * (0.80 + 0.20 * smooth(0, 0.08, t));
      color.copy(hairColor).multiplyScalar(data.colors[fiber] * (0.84 + 0.22 * smooth(0, 1, t)));
      for (let side = 0; side < sides; side++) {
        const vertex = (fiber * (segments + 1) + step) * sides + side;
        let radial, normal;
        if (crossed) {
          radial = (side < 2 ? frames.normals[step] : frames.binormals[step]).clone().multiplyScalar(side % 2 === 0 ? 1 : -1);
          normal = side < 2 ? frames.binormals[step] : frames.normals[step].clone().negate();
        } else {
          const angle = side / sides * Math.PI * 2;
          radial = frames.normals[step].clone().multiplyScalar(Math.cos(angle)).addScaledVector(frames.binormals[step], Math.sin(angle));
          normal = radial;
        }
        points[step].clone().addScaledVector(radial, width).toArray(positions, vertex * 3);
        normal.toArray(normals, vertex * 3); color.toArray(colors, vertex * 3);
        frames.tangents[step].toArray(tangents, vertex * 4); tangents[vertex * 4 + 3] = 1;
        uv[vertex * 2] = side / sides; uv[vertex * 2 + 1] = t;
      }
      if (step === segments) continue;
      const faces = crossed ? 2 : sides;
      for (let face = 0; face < faces; face++) {
        const a = (fiber * (segments + 1) + step) * sides + (crossed ? face * 2 : face);
        const b = (fiber * (segments + 1) + step) * sides + (crossed ? face * 2 + 1 : (face + 1) % sides);
        indices.set([a, b, a + sides, b, b + sides, a + sides], indexOffset);
        indexOffset += 6;
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('tangent', new THREE.BufferAttribute(tangents, 4));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  return { geometry, stats: { representation, strands: fiberCount, segments, vertices: vertexCount, triangles: indices.length / 3,
    bufferBytes: positions.byteLength + normals.byteLength + tangents.byteLength + colors.byteLength + uv.byteLength + indices.byteLength } };
}

export function snipGroomLock(data, cuts, target, radius = 0.06) {
  const point = { x: 0, y: 0, z: 0 };
  let affectedStrands = 0, removedSegments = 0;
  for (let fiber = 0; fiber < data.fiberCount; fiber++) {
    const cut = cuts[fiber];
    for (let step = Math.ceil(cut); step >= 1; step--) {
      sampleVisiblePoint(data.basePos, fiber, data.segments, cut, step, point);
      if ((point.x - target.x) ** 2 + (point.y - target.y) ** 2 + (point.z - target.z) ** 2 > radius ** 2) continue;
      const next = nextCutPosition({ current: cut, hit: Math.min(step, cut), minimum: 1.5, intent: 'snip' });
      if (next < cut) { cuts[fiber] = next; affectedStrands++; removedSegments += cut - next; }
      break;
    }
  }
  return { affectedStrands, removedSegments };
}

export function exportGroomLock(data, cuts = null) {
  return { schema: 'hairfit-groom-lock-v1', metadata: data.metadata, fiberCount: data.fiberCount, segments: data.segments,
    basePos: Array.from(data.basePos), zoneIndices: Array.from(data.zoneIndices), colors: Array.from(data.colors),pointWidthScale:Array.from(data.pointWidthScale),
    cutPositions: cuts ? Array.from(cuts) : null };
}

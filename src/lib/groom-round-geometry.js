import * as THREE from 'three';
import { sampleVisiblePoint } from './haircut-geometry.js';

export function createRoundHairLayout(strandCapacity, segments, sides = 3) {
  const vertices = strandCapacity * (segments + 1) * sides;
  const indices = new Uint32Array(strandCapacity * segments * sides * 6);
  let offset = 0;
  for (let strand = 0; strand < strandCapacity; strand++) {
    for (let step = 0; step < segments; step++) {
      for (let side = 0; side < sides; side++) {
        const a = (strand * (segments + 1) + step) * sides + side;
        const b = (strand * (segments + 1) + step) * sides + (side + 1) % sides;
        indices.set([a, b, a + sides, b, b + sides, a + sides], offset);offset += 6;
      }
    }
  }
  return {
    strandCapacity, segments, sides, indices,
    positions: new Float32Array(vertices * 3), normals: new Float32Array(vertices * 3),
    tangents: new Float32Array(vertices * 4), progress: new Float32Array(vertices),
    random: new Float32Array(vertices), radii: new Float32Array(vertices), uv: new Float32Array(vertices * 2)
  };
}

const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a)));return t * t * (3 - 2 * t); };

/** Reuses scratch storage; a snip touches only its dirty strand and its frames. */
export function createRoundStrandWriter(layout) {
  const { segments, sides } = layout, count = segments + 1;
  const points = Array.from({ length: count }, () => new THREE.Vector3());
  const tangents = Array.from({ length: count }, () => new THREE.Vector3());
  const normals = Array.from({ length: count }, () => new THREE.Vector3());
  const binormal = new THREE.Vector3(), rotation = new THREE.Quaternion();
  return (base, strand, cut, random = 0.5, widthScale = 1, pointWidthScale = null) => {
    for (let step = 0; step < count; step++) sampleVisiblePoint(base, strand, segments, cut, step, points[step]);
    for (let step = 0; step < count; step++) {
      const tangent = tangents[step].subVectors(points[Math.min(segments, step + 1)], points[Math.max(0, step - 1)]);
      if (tangent.lengthSq() < 1e-12) { if (step) tangent.copy(tangents[step - 1]);else tangent.set(0, 1, 0); }
      tangent.normalize();
      const normal = normals[step];
      if (!step) { normal.set(0, 0, 1);if (Math.abs(normal.dot(tangent)) > 0.9) normal.set(1, 0, 0); }
      else { rotation.setFromUnitVectors(tangents[step - 1], tangent);normal.copy(normals[step - 1]).applyQuaternion(rotation); }
      normal.addScaledVector(tangent, -normal.dot(tangent)).normalize();
      binormal.crossVectors(tangent, normal).normalize();
      const t = Math.min(1, step / Math.max(0.5, cut));
      const visibleStep=Math.min(cut,step),lo=Math.floor(visibleStep),hi=Math.min(segments,lo+1),blend=visibleStep-lo;
      const localWidth=pointWidthScale?pointWidthScale[strand*count+lo]*(1-blend)+pointWidthScale[strand*count+hi]*blend:1;
      const radius = widthScale * localWidth * (0.8 + 0.2 * smooth(0, 0.08, t)) * Math.pow(Math.max(0, 1 - smooth(0.58, 1, t)), 0.85);
      for (let side = 0; side < sides; side++) {
        const vertex = (strand * count + step) * sides + side, angle = side / sides * Math.PI * 2;
        const c = Math.cos(angle), s = Math.sin(angle);
        points[step].toArray(layout.positions, vertex * 3);
        layout.normals[vertex * 3] = normal.x * c + binormal.x * s;
        layout.normals[vertex * 3 + 1] = normal.y * c + binormal.y * s;
        layout.normals[vertex * 3 + 2] = normal.z * c + binormal.z * s;
        tangent.toArray(layout.tangents, vertex * 4);layout.tangents[vertex * 4 + 3] = 1;
        layout.progress[vertex] = t;layout.random[vertex] = random;layout.radii[vertex] = radius;
        layout.uv[vertex * 2] = side / sides;layout.uv[vertex * 2 + 1] = t;
      }
    }
  };
}

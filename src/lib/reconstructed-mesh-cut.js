import { BufferAttribute, BufferGeometry, SphereGeometry } from 'three';
import { Brush, Evaluator, SUBTRACTION, INTERSECTION } from 'three-bvh-csg';

// A bounded worker job keeps accidental uploads and repeated cuts from exhausting memory.
const MAX_VERTICES = 1_000_000;
const MAX_TRIANGLES = 400_000;
const MAX_COORDINATE = 10_000;

function validatePacket(packet) {
  if (!packet || !(packet.positions instanceof Float32Array) || !(packet.normals instanceof Float32Array)) throw new Error('Mesh position and normal buffers are required.');
  const { positions, normals, index } = packet;
  const vertices = positions.length / 3;
  if (!Number.isInteger(vertices) || vertices < 3 || vertices > MAX_VERTICES || normals.length !== positions.length) throw new Error('Mesh vertex count is invalid or exceeds the limit.');
  if (index !== null && !(index instanceof Uint32Array)) throw new Error('Mesh index must be Uint32Array or null.');
  const count = index ? index.length : vertices;
  if (count < 3 || count % 3 || count / 3 > MAX_TRIANGLES) throw new Error('Mesh triangle count is invalid or exceeds the limit.');
  for (let i = 0; i < positions.length; i++) {
    if (!Number.isFinite(positions[i]) || Math.abs(positions[i]) > MAX_COORDINATE || !Number.isFinite(normals[i])) throw new Error('Mesh contains invalid coordinates.');
  }
  if (index) for (const value of index) if (value >= vertices) throw new Error('Mesh index is outside the vertex buffer.');
}

function toPacket(geometry) {
  const position = geometry.getAttribute('position'), normal = geometry.getAttribute('normal');
  const available = geometry.index?.count ?? position.count;
  const start = geometry.drawRange.start;
  const count = Math.min(geometry.drawRange.count, available - start);
  if (start < 0 || start % 3 || count < 0 || count % 3 || count / 3 > MAX_TRIANGLES || count > MAX_VERTICES) throw new Error('Cut result exceeds the geometry limit.');
  // Evaluator buffers may have spare capacity. Emit only the active triangles,
  // also eliminating stale vertices which would otherwise corrupt visible bounds.
  const positions = new Float32Array(count * 3), normals = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const vertex = geometry.index ? geometry.index.getX(start + i) : start + i;
    positions[i * 3] = position.getX(vertex);
    positions[i * 3 + 1] = position.getY(vertex);
    positions[i * 3 + 2] = position.getZ(vertex);
    normals[i * 3] = normal.getX(vertex);
    normals[i * 3 + 1] = normal.getY(vertex);
    normals[i * 3 + 2] = normal.getZ(vertex);
  }
  if (!positions.every(Number.isFinite) || !normals.every(Number.isFinite)) throw new Error('Cut generated invalid coordinates.');
  return { positions, normals, index: null };
}

/** Cut an already world-baked hair shell; caller retains ownership of all input buffers. */
export function cutHairGeometry(packet, { center, radius } = {}) {
  const started = performance.now();
  validatePacket(packet);
  const xyz = Array.isArray(center) ? center : center && [center.x, center.y, center.z];
  if (!xyz || xyz.length !== 3 || !xyz.every(value => Number.isFinite(value) && Math.abs(value) <= MAX_COORDINATE) || !Number.isFinite(radius) || radius <= 0 || radius > MAX_COORDINATE) throw new Error('Cut center or radius is invalid.');
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(packet.positions.slice(), 3));
  geometry.setAttribute('normal', new BufferAttribute(packet.normals.slice(), 3));
  if (packet.index) geometry.setIndex(new BufferAttribute(packet.index.slice(), 1));
  const source = new Brush(geometry);
  const cutter = new Brush(new SphereGeometry(radius, 24, 16));
  cutter.position.set(...xyz);
  source.updateMatrixWorld(true);
  cutter.updateMatrixWorld(true);
  const targets = [new Brush(), new Brush()];
  try {
    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal'];
    evaluator.useGroups = false;
    evaluator.evaluate(source, cutter, [SUBTRACTION, INTERSECTION], targets);
    const remaining = toPacket(targets[0].geometry), removed = toPacket(targets[1].geometry);
    return { remaining, removed, removedTriangles: removed.positions.length / 9, durationMs: performance.now() - started };
  } finally {
    for (const brush of [source, cutter, ...targets]) {
      brush.disposeCacheData();
      brush.geometry.dispose();
      brush.material?.dispose?.();
    }
  }
}

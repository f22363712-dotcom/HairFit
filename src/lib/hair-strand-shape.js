/** Place one child around its shared guide curve. */
export function offsetChildHairPoint(point, bitangent, normal, {
  lateral, radial, progress, wave = 0, depthWave = 0, clearance = 0.006
}, collide) {
  const clump = (1 - 0.58 * Math.pow(progress, 1.5)) * (0.82 + 0.18 * Math.sin(progress * Math.PI));
  point.addScaledVector(bitangent, lateral * clump + wave)
    .addScaledVector(normal, radial * (1 - 0.5 * progress));
  point.z += depthWave;
  // Child offsets can move even the first vertex under the head surface.
  collide(point, clearance);
  return point;
}


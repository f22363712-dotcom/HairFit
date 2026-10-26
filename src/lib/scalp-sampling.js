/** Select a fixed guide budget evenly across the complete eligible scalp. */
export function* sampleScalpDirections(count, mask, random) {
  const totalCandidates = Math.ceil(count * 2.35);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const eligible = [];
  for (let candidate = 0; candidate < totalCandidates; candidate++) {
    const fraction = (candidate + 0.5) / totalCandidates;
    const y = Math.min(0.998, Math.max(-0.65,
      0.995 - fraction * 1.615 + (random() - 0.5) * (1.2 / totalCandidates)));
    const phi = candidate * goldenAngle + (random() - 0.5) * 0.14;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const x = radius * Math.cos(phi), z = radius * Math.sin(phi);
    if (mask(x, y, z) >= 0.55) eligible.push({ x, y, z });
  }
  if (eligible.length < count) {
    throw new RangeError('Scalp mask does not contain enough guide candidates');
  }
  // The pool is ordered by latitude. Cover every interval of that full pool
  // instead of stopping as soon as its upper portion supplies enough roots.
  const stride = eligible.length / count;
  for (let guide = 0; guide < count; guide++) {
    yield eligible[Math.floor((guide + 0.5) * stride)];
  }
}

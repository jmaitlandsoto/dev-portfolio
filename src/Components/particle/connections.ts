// Distance is measured in the x/y plane only: connections are meant to read
// as a flat web overlaying the field, regardless of each particle's depth.
export function findConnections(
  positions: Float32Array,
  count: number,
  threshold: number
): Float32Array {
  const segments: number[] = [];

  for (let i = 0; i < count; i++) {
    const xi = positions[i * 3];
    const yi = positions[i * 3 + 1];
    const zi = positions[i * 3 + 2];

    for (let j = i + 1; j < count; j++) {
      const xj = positions[j * 3];
      const yj = positions[j * 3 + 1];
      const zj = positions[j * 3 + 2];

      const dx = xi - xj;
      const dy = yi - yj;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        segments.push(xi, yi, zi, xj, yj, zj);
      }
    }
  }

  return new Float32Array(segments);
}

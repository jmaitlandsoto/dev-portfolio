/**
 * Builds an SVG path ("M x,y L x,y ...") that scales `values` to fill a
 * width × height box, with `padding` kept clear at the top and bottom.
 * Returns "" when there aren't enough points to draw a line.
 */
export function sparklinePath(
  values: number[],
  width: number,
  height: number,
  padding = 2,
): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const usable = height - padding * 2;
  const step = width / (values.length - 1);

  return values
    .map((v, i) => {
      // A flat series draws through the middle instead of dividing by zero
      const y = range === 0 ? height / 2 : padding + usable * (1 - (v - min) / range);
      const x = i * step;
      return `${i === 0 ? "M" : "L"}${round(x)},${round(y)}`;
    })
    .join(" ");
}

const round = (n: number) => Math.round(n * 100) / 100;

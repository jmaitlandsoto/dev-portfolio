// Fixed-size buffer of [unixSeconds, value] points; oldest are dropped.
export function createHistory(capacity) {
  const points = [];
  return {
    push(t, value) {
      if (value === null || value === undefined) return;
      points.push([t, value]);
      if (points.length > capacity) points.splice(0, points.length - capacity);
    },
    toArray() {
      return points.slice();
    },
  };
}

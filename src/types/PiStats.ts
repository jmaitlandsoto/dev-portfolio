// Shape of GET /api/stats from the pistats sidecar (api/src/server.js).
// Any field can be null when the host doesn't expose it.
export interface PiStats {
  board: string | null;
  uptimeSec: number | null;
  cpu: {
    tempC: number | null;
    usagePct: number | null;
    loadAvg: [number, number, number] | null;
    freqMhz: number | null;
    cores: number | null;
  };
  memory: { usedBytes: number; totalBytes: number } | null;
  fanRpm: number | null;
  deploy: { commit: string | null; builtAt: string | null };
  history: { tempC: [number, number][] };
  sampledAt: number;
}

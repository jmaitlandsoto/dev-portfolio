// Pure parsers for Linux /proc and /sys files. Each takes the raw file text
// and returns a number/object, or null if the text isn't what we expect.

const round1 = (n) => Math.round(n * 10) / 10;

const toNumber = (text) => {
  const n = Number.parseFloat(String(text).trim());
  return Number.isFinite(n) ? n : null;
};

/** /sys/class/thermal/thermal_zone0/temp — millidegrees C → °C */
export function parseTemp(text) {
  const n = toNumber(text);
  return n === null ? null : round1(n / 1000);
}

/** /proc/loadavg — "0.12 0.08 0.05 1/234 5678" → [0.12, 0.08, 0.05] */
export function parseLoadAvg(text) {
  const parts = String(text).trim().split(/\s+/).slice(0, 3).map(Number);
  return parts.length === 3 && parts.every(Number.isFinite) ? parts : null;
}

/** /proc/meminfo — used = MemTotal - MemAvailable, in bytes */
export function parseMemInfo(text) {
  const kb = {};
  for (const line of String(text).split("\n")) {
    const match = line.match(/^(\w+):\s+(\d+)/);
    if (match) kb[match[1]] = Number(match[2]);
  }
  if (kb.MemTotal === undefined || kb.MemAvailable === undefined) return null;
  return {
    usedBytes: (kb.MemTotal - kb.MemAvailable) * 1024,
    totalBytes: kb.MemTotal * 1024,
  };
}

/** /proc/uptime — "12345.67 45678.90" → 12345 (whole seconds) */
export function parseUptime(text) {
  const n = toNumber(String(text).trim().split(/\s+/)[0]);
  return n === null ? null : Math.floor(n);
}

/**
 * /proc/stat — aggregate "cpu" line → { idle, total } jiffies, plus the core
 * count (number of "cpuN" lines).
 */
export function parseCpuTimes(text) {
  const lines = String(text).split("\n");
  const cpuLine = lines.find((l) => l.startsWith("cpu "));
  if (!cpuLine) return null;
  const values = cpuLine.trim().split(/\s+/).slice(1).map(Number);
  // user nice system idle iowait irq softirq steal ...
  const idle = values[3] + (values[4] ?? 0);
  const total = values.slice(0, 8).reduce((sum, v) => sum + (v || 0), 0);
  const cores = lines.filter((l) => /^cpu\d+\s/.test(l)).length;
  return { idle, total, cores };
}

/** CPU busy % between two /proc/stat samples. */
export function cpuUsagePct(prev, next) {
  if (!prev || !next) return null;
  const totalDelta = next.total - prev.total;
  if (totalDelta <= 0) return null;
  const idleDelta = next.idle - prev.idle;
  return round1(((totalDelta - idleDelta) / totalDelta) * 100);
}

/** scaling_cur_freq — kHz → MHz */
export function parseCpuFreq(text) {
  const n = toNumber(text);
  return n === null ? null : Math.round(n / 1000);
}

/** hwmon fan1_input — RPM */
export function parseFanRpm(text) {
  const n = toNumber(text);
  return n === null ? null : Math.round(n);
}

/** Device-tree model string, which is NUL-terminated. */
export function parseModel(text) {
  const model = String(text).replace(/\0/g, "").trim();
  return model || null;
}

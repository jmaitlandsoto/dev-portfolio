const pad = (n: number) => String(n).padStart(2, "0");

/** 1054387 → "12d 4h 53m 07s"; drops the day part when under a day. */
export function formatUptime(totalSec: number): string {
  const sec = Math.max(0, Math.floor(totalSec));
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  const time = `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
  return days > 0 ? `${days}d ${time}` : time;
}

/** Bytes → "812 MB" or "7.9 GB". */
export function formatBytes(bytes: number): string {
  const GB = 1024 ** 3;
  const MB = 1024 ** 2;
  if (bytes >= GB) return `${(bytes / GB).toFixed(1)} GB`;
  return `${Math.round(bytes / MB)} MB`;
}

/** ISO date → "just now", "5m ago", "3h ago", "2d ago". */
export function timeAgo(iso: string, now: number = Date.now()): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const sec = Math.max(0, Math.floor((now - then) / 1000));
  if (sec < 60) return "just now";
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

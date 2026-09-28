import { createServer } from "node:http";
import { collect, readBoardModel } from "./collect.js";
import { cpuUsagePct } from "./parsers.js";
import { createHistory } from "./history.js";

const PORT = Number(process.env.PORT ?? 3300);
const SAMPLE_INTERVAL_MS = 5_000;
const HISTORY_INTERVAL_MS = 30_000;
const HISTORY_POINTS = 120; // 1 hour at 30s

const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
);

const deploy = {
  commit: process.env.GIT_SHA || null,
  builtAt: process.env.BUILD_TIME || null,
};

const board = await readBoardModel();
const tempHistory = createHistory(HISTORY_POINTS);
let prevCpuTimes = null;
let snapshot = null;
let lastHistoryAt = 0;

// Hardware is read on a timer, never per request, so traffic can't load the Pi.
async function sample() {
  const raw = await collect();
  const now = Date.now();
  const nowSec = Math.floor(now / 1000);

  if (now - lastHistoryAt >= HISTORY_INTERVAL_MS) {
    tempHistory.push(nowSec, raw.tempC);
    lastHistoryAt = now;
  }

  snapshot = {
    board,
    uptimeSec: raw.uptimeSec,
    cpu: {
      tempC: raw.tempC,
      usagePct: cpuUsagePct(prevCpuTimes, raw.cpuTimes),
      loadAvg: raw.loadAvg,
      freqMhz: raw.freqMhz,
      cores: raw.cpuTimes?.cores || null,
    },
    memory: raw.memory,
    fanRpm: raw.fanRpm,
    deploy,
    history: { tempC: tempHistory.toArray() },
    sampledAt: nowSec,
  };
  prevCpuTimes = raw.cpuTimes;
}

function send(req, res, status, body, contentType = "application/json") {
  const origin = req.headers.origin;
  const headers = {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, OPTIONS";
  }
  res.writeHead(status, headers);
  res.end(body);
}

const server = createServer((req, res) => {
  const path = new URL(req.url ?? "/", "http://localhost").pathname;

  if (req.method === "OPTIONS") return send(req, res, 204, "");
  if (req.method !== "GET") {
    return send(req, res, 405, JSON.stringify({ error: "method not allowed" }));
  }
  if (path === "/api/health") return send(req, res, 200, "ok", "text/plain");
  if (path === "/api/stats") {
    if (!snapshot) {
      return send(req, res, 503, JSON.stringify({ error: "warming up" }));
    }
    return send(req, res, 200, JSON.stringify(snapshot));
  }
  return send(req, res, 404, JSON.stringify({ error: "not found" }));
});

await sample();
setInterval(() => {
  sample().catch((err) => console.error("sample failed:", err));
}, SAMPLE_INTERVAL_MS);

server.listen(PORT, () => {
  console.log(`pistats listening on :${PORT}`);
});

// Exit promptly on `docker compose stop` instead of waiting for SIGKILL.
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}

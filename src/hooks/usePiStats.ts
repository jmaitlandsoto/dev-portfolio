import { useEffect, useState } from "react";
import type { PiStats } from "@/types/PiStats";

// The Netlify copy and the Pi copy both read from the Pi. In dev,
// .env.development points this at the Vite proxy instead.
const STATS_URL =
  import.meta.env.VITE_STATS_URL ?? "https://pi.joshmaitland.ca/api/stats";

const OPEN_INTERVAL_MS = 5_000;
const CLOSED_INTERVAL_MS = 30_000;
const FETCH_TIMEOUT_MS = 4_000;

export type PiStatus = "loading" | "online" | "offline";

/**
 * Polls the Pi stats API. Polls faster while the panel is open, and stops
 * entirely while the tab is hidden.
 */
export function usePiStats(open: boolean) {
  const [stats, setStats] = useState<PiStats | null>(null);
  const [status, setStatus] = useState<PiStatus>("loading");
  // Client clock time of the last successful fetch, for ticking the uptime
  const [receivedAt, setReceivedAt] = useState(0);

  const interval = open ? OPEN_INTERVAL_MS : CLOSED_INTERVAL_MS;

  useEffect(() => {
    let cancelled = false;
    let inFlight = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;

    // The first fetch always runs; only the repeat polls pause while hidden
    const poll = async (initial = false) => {
      if (inFlight || (document.hidden && !initial)) return;
      inFlight = true;
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), FETCH_TIMEOUT_MS);
      try {
        const res = await fetch(STATS_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: PiStats = await res.json();
        if (!cancelled) {
          setStats(data);
          setReceivedAt(Date.now());
          setStatus("online");
        }
      } catch {
        if (!cancelled) setStatus("offline");
      } finally {
        clearTimeout(timeout);
        inFlight = false;
      }
      if (!cancelled && !document.hidden) timer = setTimeout(poll, interval);
    };

    const onVisibilityChange = () => {
      clearTimeout(timer);
      if (!document.hidden) poll();
    };

    poll(true);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller?.abort();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [interval]);

  return { stats, status, receivedAt };
}

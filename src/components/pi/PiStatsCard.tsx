import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRaspberryPi } from "@fortawesome/free-brands-svg-icons";
import {
  Clock,
  Cpu,
  Fan,
  GitCommitHorizontal,
  MemoryStick,
  Thermometer,
  X,
} from "lucide-react";
import type { PiStats } from "@/types/PiStats";
import type { PiStatus } from "@/hooks/usePiStats";
import { formatBytes, formatUptime, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Sparkline } from "./Sparkline";
import { StatusDot } from "./StatusDot";

const REPO_URL = "https://github.com/jmaitlandsoto/dev-portfolio";
const PI_HOST = "pi.joshmaitland.ca";

export interface IPiStatsCardProps {
  stats: PiStats;
  status: PiStatus;
  receivedAt: number;
  onClose: () => void;
}

export function PiStatsCard({
  stats,
  status,
  receivedAt,
  onClose,
}: IPiStatsCardProps) {
  const now = useNow(1000);
  const { cpu, memory, fanRpm, deploy } = stats;
  const temps = stats.history.tempC.map(([, v]) => v);
  const onPi = window.location.hostname === PI_HOST;

  const uptime =
    stats.uptimeSec === null
      ? null
      : stats.uptimeSec + (now - receivedAt) / 1000;

  return (
    <div className="flex flex-col gap-4 p-5">
      <header className="flex items-start gap-3">
        <FontAwesomeIcon icon={faRaspberryPi} className="mt-0.5 text-2xl" />
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold leading-tight">Live from the Pi</h2>
          <p className="text-muted-foreground text-xs truncate">
            {stats.board ?? "Raspberry Pi"}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <StatusDot status={status} />
          {status === "offline" ? "Offline" : "Live"}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Pi stats"
          autoFocus
          className="hover:bg-foreground/10 -mt-1 -mr-1 p-1 rounded-md transition-colors"
        >
          <X className="size-4" />
        </button>
      </header>

      <div className="grid grid-cols-2 gap-2">
        <Tile icon={<Thermometer />} label="CPU temp">
          <span className={tempColor(cpu.tempC)}>
            {cpu.tempC === null ? "—" : `${cpu.tempC.toFixed(1)}°C`}
          </span>
        </Tile>
        <Tile
          icon={<Cpu />}
          label="CPU"
          detail={cpu.loadAvg ? `load ${cpu.loadAvg[0].toFixed(2)}` : undefined}
        >
          {cpu.usagePct === null ? "—" : `${Math.round(cpu.usagePct)}%`}
        </Tile>
        <Tile
          icon={<MemoryStick />}
          label="Memory"
          detail={memory ? `of ${formatBytes(memory.totalBytes)}` : undefined}
        >
          {memory ? formatBytes(memory.usedBytes) : "—"}
          {memory && (
            <Bar value={memory.usedBytes / memory.totalBytes} />
          )}
        </Tile>
        <Tile
          icon={<SpinningFan rpm={fanRpm} />}
          label="Fan"
          detail={cpu.freqMhz ? `CPU @ ${cpu.freqMhz} MHz` : undefined}
        >
          {fanRpm === null ? "—" : `${fanRpm} RPM`}
        </Tile>
      </div>

      {temps.length >= 2 && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Temperature · last hour</span>
            <span>
              {Math.min(...temps).toFixed(0)}–{Math.max(...temps).toFixed(0)}°C
            </span>
          </div>
          <Sparkline values={temps} label="CPU temperature over the last hour" />
        </div>
      )}

      <dl className="flex flex-col gap-1.5 text-muted-foreground text-xs">
        {uptime !== null && (
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0" />
            <dt>Up</dt>
            <dd className="tabular-nums text-foreground">
              {formatUptime(uptime)}
            </dd>
          </div>
        )}
        {deploy.commit && (
          <div className="flex items-center gap-2">
            <GitCommitHorizontal className="size-3.5 shrink-0" />
            <dt>Deployed</dt>
            <dd>
              <a
                href={`${REPO_URL}/commit/${deploy.commit}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-foreground hover:underline"
              >
                {deploy.commit.slice(0, 7)}
              </a>
              {deploy.builtAt && ` · ${timeAgo(deploy.builtAt, now)}`}
            </dd>
          </div>
        )}
      </dl>

      <p className="pt-3 border-t border-border text-muted-foreground text-xs">
        {onPi ? (
          "You're viewing the self-hosted copy of this site, served from this board through a Cloudflare Tunnel."
        ) : (
          <>
            This site also has a self-hosted twin running on this board at{" "}
            <a
              href={`https://${PI_HOST}`}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:underline"
            >
              {PI_HOST}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}

interface ITileProps {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  children: React.ReactNode;
}

function Tile({ icon, label, detail, children }: ITileProps) {
  return (
    <div className="flex flex-col gap-1 bg-foreground/[0.03] p-3 border border-border rounded-lg">
      <span className="flex items-center gap-1.5 text-muted-foreground text-xs [&_svg]:size-3.5">
        {icon}
        {label}
      </span>
      <span className="font-semibold tabular-nums text-lg leading-tight">
        {children}
      </span>
      {detail && (
        <span className="text-muted-foreground text-xs tabular-nums">
          {detail}
        </span>
      )}
    </div>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <span className="block bg-foreground/10 mt-1.5 rounded-full h-1 overflow-hidden">
      <span
        className="block bg-sky-400 h-full rounded-full transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
      />
    </span>
  );
}

// Spins faster as the real fan does. Real RPM is far too fast to show
// literally, so it's mapped onto a 0.4s–3s rotation.
function SpinningFan({ rpm }: { rpm: number | null }) {
  const spinning = rpm !== null && rpm > 0;
  const duration = spinning ? Math.min(3, Math.max(0.4, 3000 / rpm)) : 0;
  return (
    <Fan
      className={cn(spinning && "motion-safe:animate-spin")}
      style={spinning ? { animationDuration: `${duration}s` } : undefined}
    />
  );
}

function tempColor(tempC: number | null) {
  if (tempC === null || tempC < 60) return undefined;
  return tempC < 75 ? "text-amber-400" : "text-red-400";
}

function useNow(intervalMs: number) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

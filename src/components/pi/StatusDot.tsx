import type { PiStatus } from "@/hooks/usePiStats";
import { cn } from "@/lib/utils";

export function StatusDot({ status }: { status: PiStatus }) {
  const online = status === "online";
  return (
    <span className="relative flex size-2">
      {online && (
        <span className="absolute inline-flex bg-emerald-400 opacity-75 rounded-full size-full motion-safe:animate-ping" />
      )}
      <span
        className={cn(
          "relative inline-flex rounded-full size-2",
          online ? "bg-emerald-400" : "bg-zinc-400",
        )}
      />
    </span>
  );
}

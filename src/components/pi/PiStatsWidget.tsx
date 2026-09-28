import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRaspberryPi } from "@fortawesome/free-brands-svg-icons";
import { usePiStats } from "@/hooks/usePiStats";
import { PiStatsCard } from "./PiStatsCard";
import { StatusDot } from "./StatusDot";

const EASE = [0.22, 1, 0.36, 1] as const;
const LAYOUT_ID = "pi-stats";

/**
 * Fixed bottom-left Raspberry Pi button that morphs into a live stats card.
 * Renders nothing until the Pi has answered at least once, so it stays out of
 * the way when the Pi is unreachable.
 */
export function PiStatsWidget() {
  const [open, setOpen] = React.useState(false);
  const { stats, status, receivedAt } = usePiStats(open);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const wasOpen = React.useRef(false);

  const close = React.useCallback(() => setOpen(false), []);

  // Esc or a click outside the card closes it
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  // Return keyboard focus to the button after closing
  React.useEffect(() => {
    if (wasOpen.current && !open) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  if (!stats) return null;

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="card"
          ref={cardRef}
          layoutId={LAYOUT_ID}
          role="dialog"
          aria-label="Live Raspberry Pi stats"
          transition={{ duration: 0.35, ease: EASE }}
          style={{ borderRadius: 16 }}
          className="bottom-3 sm:bottom-6 left-3 sm:left-6 z-50 fixed bg-popover/85 shadow-2xl backdrop-blur-md border border-border w-[calc(100vw-1.5rem)] sm:w-96 max-h-[calc(100dvh-1.5rem)] overflow-y-auto text-popover-foreground"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <PiStatsCard
              stats={stats}
              status={status}
              receivedAt={receivedAt}
              onClose={close}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.button
          key="button"
          ref={buttonRef}
          layoutId={LAYOUT_ID}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Show live Raspberry Pi stats"
          aria-expanded={false}
          transition={{ duration: 0.35, ease: EASE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{ borderRadius: 999 }}
          className="bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 fixed flex justify-center items-center bg-popover/70 shadow-lg backdrop-blur-md border border-border size-12 text-popover-foreground"
        >
          <FontAwesomeIcon icon={faRaspberryPi} className="text-xl" />
          <span className="top-0.5 right-0.5 absolute">
            <StatusDot status={status} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default PiStatsWidget;

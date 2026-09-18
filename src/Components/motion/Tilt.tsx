import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./variants";

export interface ITiltProps extends Omit<
  HTMLMotionProps<"div">,
  "onMouseMove" | "onMouseLeave" | "ref"
> {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

const SPRING = { stiffness: 300, damping: 120, mass: 0.5 };

export function Tilt({
  children,
  className,
  style,
  maxTilt = 2,
  perspective = 500,
  scale = 1,
  ...props
}: ITiltProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    SPRING,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className={cn(className)}
      style={{ ...style, transformPerspective: perspective, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration: 1, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

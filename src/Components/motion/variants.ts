import * as React from "react";
import { Variants } from "framer-motion";

// React's DOM event handler types for these props conflict with framer-motion's
// gesture/animation prop types of the same name, so section wrappers that spread
// {...props} onto a motion.section need this to satisfy both.
export type MotionSectionProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
>;

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.5;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

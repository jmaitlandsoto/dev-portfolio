import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "./variants";

const tagToMotion = {
  div: motion.div,
  ol: motion.ol,
  ul: motion.ul,
  footer: motion.footer,
};

export interface IStaggerGroupProps {
  as?: keyof typeof tagToMotion;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  amount?: number | "some" | "all";
}

export function StaggerGroup({
  as = "div",
  children,
  className,
  style,
  once = true,
  amount = 0.2,
}: IStaggerGroupProps) {
  const MotionTag = tagToMotion[as];
  return (
    <MotionTag
      className={className}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

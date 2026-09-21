import * as React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "./variants";

export interface IRevealProps {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  once = true,
  amount = 0.2,
  className,
}: IRevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

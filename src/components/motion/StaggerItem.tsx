import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { staggerItem } from "./variants";

const tagToMotion = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  a: motion.a,
};

type Tag = keyof typeof tagToMotion;

export type IStaggerItemProps<T extends Tag = "div"> = {
  as?: T;
} & Omit<HTMLMotionProps<T>, "as">;

export function StaggerItem<T extends Tag = "div">({
  as,
  children,
  ...props
}: IStaggerItemProps<T>) {
  const MotionTag = tagToMotion[as ?? "div"] as React.ElementType;
  return (
    <MotionTag variants={staggerItem} {...props}>
      {children}
    </MotionTag>
  );
}

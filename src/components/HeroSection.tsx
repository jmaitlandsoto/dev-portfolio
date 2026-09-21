import * as React from "react";
import { motion, Variants } from "framer-motion";
import portrait from "../assets/josh-portrait.jpg";
import { TextHeading } from "./TextHeading";
import { staggerContainer, staggerItem, EASE } from "./motion/variants";
import { Tilt } from "./motion";
import { ThemeToggle } from "./ThemeToggle";

export interface IHeroSectionProps {}

const portraitVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function HeroSection(props: IHeroSectionProps) {
  return (
    <section>
      <motion.div
        className="flex flex-col items-start gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={staggerItem}>
          <TextHeading level={1}>Josh Maitland</TextHeading>
        </motion.div>
        <motion.div variants={staggerItem}>
          <TextHeading level={4}>Full-Stack Software Engineer</TextHeading>
        </motion.div>
        <motion.p variants={staggerItem}>
          Building distributed systems, AI agents, and production APIs — from
          architecture through CI/CD delivery. Based in Toronto, ON.
        </motion.p>
        <div className="inline-block relative">
          <Tilt variants={portraitVariant} maxTilt={10}>
            <img
              src={portrait}
              alt="Hero"
              className="p-2 hover:p-1 rounded-full w-40 md:w-60 object-cover object-position-center aspect-square transition-all glass align-start"
            />
          </Tilt>
          <ThemeToggle className="right-0 md:right-2 bottom-0 md:bottom-2 absolute" />
        </div>
      </motion.div>
    </section>
  );
}

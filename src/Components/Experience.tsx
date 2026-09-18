import { motion } from "framer-motion";
import { TextHeading } from "./TextHeading";
import { ExperienceCard } from "./ExperienceCard";
import { experience } from "../data/experience";
import React from "react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  MotionSectionProps,
} from "./motion/variants";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface IExperienceProps {}

export const Experience = React.forwardRef<HTMLDivElement, MotionSectionProps>(
  (props, ref) => {
    return (
      <motion.section
        {...props}
        ref={ref}
        className="flex flex-col gap-6"
        variants={fadeInUp}
        // initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <TextHeading level={2}>Experience</TextHeading>
        <motion.ol
          className="p-0"
          style={{ listStyle: "none" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experience.map((exp, i) => (
            <motion.li key={i} className="mb-12" variants={staggerItem}>
              <ExperienceCard experience={exp} />
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>
    );
  },
);

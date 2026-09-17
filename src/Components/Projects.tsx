import * as React from "react";
import { motion } from "framer-motion";
import { TextHeading } from "./TextHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";
import { fadeInUp, staggerContainer, staggerItem, MotionSectionProps } from "./motion/variants";

export interface IProjectsProps {}

export const Projects = React.forwardRef<HTMLDivElement, MotionSectionProps>((props, ref) => {
  return (
    <motion.section
      {...props}
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <TextHeading level={2}>Projects</TextHeading>
      <motion.ol
        className="p-0"
        style={{ listStyle: "none" }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, i) => (
          <motion.li key={i} className="mb-12" variants={staggerItem}>
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ol>
    </motion.section>
  );
});

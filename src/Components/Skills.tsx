import * as React from "react";
import { motion } from "framer-motion";
import { TextHeading } from "./TextHeading";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { GlassCard } from "./GlassCard";
import { skillCategories } from "../data/skills";
import { fadeInUp, MotionSectionProps } from "./motion/variants";

export interface ISkillsProps {}

export const Skills = React.forwardRef<HTMLDivElement, MotionSectionProps>((props, ref) => {
  return (
    <motion.section
      {...props}
      className="flex flex-col gap-6"
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <TextHeading level={2}>Skills</TextHeading>
      <div className="flex flex-col gap-8">
        {skillCategories.map((group, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 "
            // style={{
            //   marginLeft: "-1.5rem",
            //   marginRight: "-1.5rem",
            //   padding: "1.5rem",
            // }}
          >
            <TextHeading level={6}>{group.category}</TextHeading>
            <SkillBadgeGroup skills={group.skills} />
          </div>
        ))}
      </div>
    </motion.section>
  );
});

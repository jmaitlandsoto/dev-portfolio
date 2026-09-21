import * as React from "react";
import { motion, Transition } from "framer-motion";
import { TextHeading } from "./TextHeading";
import { SkillBadge } from "./SkillBadge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { skillCategories } from "../data/skills";
import { fadeInUp, MotionSectionProps } from "./motion/variants";
import { GlassCard } from "./GlassCard";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { cn } from "cn";

export interface ISkillsProps {}

const allSkills = skillCategories
  .flatMap((group) =>
    group.skills.map((skill) => ({ name: skill, category: group.category })),
  )
  .sort((a, b) => a.name.localeCompare(b.name));

const categories = skillCategories.map((group) => group.category);

const reorderTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 1,
};

export const Skills = React.forwardRef<HTMLDivElement, MotionSectionProps>(
  (props, ref) => {
    const [selectedCategories, setSelectedCategories] = React.useState<
      string[]
    >([]);

    const sortedSkills = React.useMemo(() => {
      if (selectedCategories.length === 0) {
        return allSkills.map((skill) => skill);
      }
      const inSelected: { name: string; category: string }[] = [];
      const rest: { name: string; category: string }[] = [];
      for (const skill of allSkills) {
        (selectedCategories.includes(skill.category) ? inSelected : rest).push(
          skill,
        );
      }
      return [...inSelected, ...rest];
    }, [selectedCategories]);

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
        <GlassCard>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Sort by skill category</FieldLabel>
              <ToggleGroup
                type="multiple"
                value={selectedCategories}
                onValueChange={setSelectedCategories}
                className="flex-wrap gap-2"
              >
                {categories.map((category) => (
                  <ToggleGroupItem
                    key={category}
                    value={category}
                    className="px-4 py-2 rounded-full"
                  >
                    {category}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
            <Separator />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {sortedSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                transition={reorderTransition}
              >
                <div
                  className={cn(
                    selectedCategories.length === 0 ||
                      selectedCategories.includes(skill.category)
                      ? "opacity-100"
                      : "opacity-40",
                  )}
                >
                  <SkillBadge>{skill.name}</SkillBadge>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    );
  },
);

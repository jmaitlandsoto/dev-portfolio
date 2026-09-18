import * as React from "react";
import { motion } from "framer-motion";
import { TextHeading } from "./TextHeading";
import { SkillBadge } from "./SkillBadge";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { skillCategories } from "../data/skills";
import { fadeInUp, MotionSectionProps } from "./motion/variants";

export interface ISkillsProps {}

const allSkills = skillCategories
  .flatMap((group) =>
    group.skills.map((skill) => ({ name: skill, category: group.category })),
  )
  .sort((a, b) => a.name.localeCompare(b.name));

const categories = skillCategories.map((group) => group.category);

export const Skills = React.forwardRef<HTMLDivElement, MotionSectionProps>(
  (props, ref) => {
    const [query, setQuery] = React.useState("");
    const [selectedCategories, setSelectedCategories] = React.useState<
      string[]
    >([]);

    const filteredSkills = React.useMemo(() => {
      const prefix = query.trim().toLowerCase();
      return allSkills
        .filter((skill) => skill.name.toLowerCase().startsWith(prefix))
        .filter(
          (skill) =>
            selectedCategories.length === 0 ||
            selectedCategories.includes(skill.category),
        )
        .map((skill) => skill.name);
    }, [query, selectedCategories]);

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
        <div className="flex flex-col gap-4">
          {/* <Input
            type="text"
            placeholder="Search skills…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border-transparent rounded-full h-auto glass"
          /> */}
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
        </div>
        {filteredSkills.length > 0 ? (
          <div className="flex flex-row flex-wrap gap-2">
            {filteredSkills.map((skill) => (
              <SkillBadge key={skill}>{skill}</SkillBadge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No matching skills.</p>
        )}
      </motion.section>
    );
  },
);

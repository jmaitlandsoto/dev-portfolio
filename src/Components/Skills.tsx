import * as React from "react";
import { TextHeading } from "./TextHeading";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { skillCategories } from "../data/skills";

export interface ISkillsProps {}

export const Skills = React.forwardRef<
  HTMLDivElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>((props, ref) => {
  return (
    <section {...props} ref={ref}>
      <TextHeading level={2}>Skills</TextHeading>
      <div className="d-flex flex-column gap-4">
        {skillCategories.map((group, i) => (
          <div key={i}>
            <TextHeading level={6}>{group.category}</TextHeading>
            <SkillBadgeGroup skills={group.skills} />
          </div>
        ))}
      </div>
    </section>
  );
});

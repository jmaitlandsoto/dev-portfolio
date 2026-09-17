import * as React from "react";
import { SkillBadge } from "./SkillBadge";
import { StaggerGroup } from "./motion/StaggerGroup";
import { StaggerItem } from "./motion/StaggerItem";

export interface ISkillBadgeGroupProps {
  skills: string[];
}

export function SkillBadgeGroup(props: ISkillBadgeGroupProps) {
  const { skills } = props;
  return (
    <StaggerGroup className="flex flex-row flex-wrap gap-2" amount={0.4}>
      {skills.map((skill: string, i: number) => (
        <StaggerItem as="span" key={i}>
          <SkillBadge>{skill}</SkillBadge>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

import * as React from "react";
import { SkillBadge } from "./SkillBadge";

export interface ISkillBadgeGroupProps {
  skills: string[];
}

export function SkillBadgeGroup(props: ISkillBadgeGroupProps) {
  const { skills } = props;
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {skills.map((skill: string, i: number) => (
        <SkillBadge key={i}>{skill}</SkillBadge>
      ))}
    </div>
  );
}

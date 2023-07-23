import * as React from "react";
import Badge from "react-bootstrap/esm/Badge";
import { SkillBadge } from "./SkillBadge";

export interface ISkillBadgeGroupProps {
  skills: string[];
}

export function SkillBadgeGroup(props: ISkillBadgeGroupProps) {
  const { skills } = props;
  return (
    <div className="d-flex flex-row gap-2">
      {skills.map((skill: string, i: number) => (
        <SkillBadge key={i}>{skill}</SkillBadge>
      ))}
    </div>
  );
}

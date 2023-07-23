import * as React from "react";
import Badge from "react-bootstrap/esm/Badge";

export interface ISkillBadgeProps {
  children: React.ReactNode;
}

export function SkillBadge(props: ISkillBadgeProps) {
  const { children } = props;
  return (
    <Badge
      bg="secondary"
      className="p-2 px-3 rounded-pill"
      style={{ backgroundColor: "#5C1F2B" }}
    >
      {children}
    </Badge>
  );
}

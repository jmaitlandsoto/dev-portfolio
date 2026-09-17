import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface ISkillBadgeProps {
  children: React.ReactNode;
}

export function SkillBadge(props: ISkillBadgeProps) {
  const { children } = props;
  return (
    <Badge
      variant={"default"}
      className="px-4 py-2 rounded-full glass backdrop-blur-xs"
    >
      {children}
    </Badge>
  );
}

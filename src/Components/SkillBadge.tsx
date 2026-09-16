import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface ISkillBadgeProps {
  children: React.ReactNode;
}

export function SkillBadge(props: ISkillBadgeProps) {
  const { children } = props;
  return (
    <Badge className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1),0_4px_24px_rgba(0,0,0,0.3)]">
      {children}
    </Badge>
  );
}

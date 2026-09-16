import * as React from "react";
import { Card } from "@/components/ui/card";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { TextHeading } from "./TextHeading";
import { useRef } from "react";
import { Project } from "../types/Project";
import { GlassCard } from "./GlassCard";

export interface IProjectCardProps {
  project: Project;
}

export function ProjectCard(props: IProjectCardProps) {
  const { title, description, techStack, href } = props.project;

  const linkRef = useRef<HTMLAnchorElement>(null); // initialize a ref

  const handleCardClick = () => {
    if (linkRef.current) {
      linkRef.current.click(); // Programmatically click the link when the card is clicked
    }
  };

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        ref={linkRef} // Assign the linkRef to our link
      >
        <GlassCard
          className="flex flex-col gap-4"
          style={{
            marginLeft: "-1.5rem",
            marginRight: "-1.5rem",
            padding: "1.5rem",
          }}
        >
          <TextHeading level={5}>{title}</TextHeading>
          <p>{description}</p>
          <SkillBadgeGroup skills={techStack} />
        </GlassCard>
      </a>
    </>
  );
}

import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { TextHeading } from "./TextHeading";
import { Project } from "../types/Project";
import { GlassCard } from "./GlassCard";
import { Tilt } from "./motion";
import { ExternalLink } from "lucide-react";

export interface IProjectCardProps {
  project: Project;
}

export function ProjectCard(props: IProjectCardProps) {
  const { title, description, techStack, href } = props.project;

  return (
    <Tilt>
      <GlassCard className="flex flex-col gap-4">
        <TextHeading level={5}>{title}</TextHeading>
        <p>{description}</p>
        <SkillBadgeGroup skills={techStack} />
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex flex-row self-center gap-1"
        >
          Learn more <ExternalLink className="size-4 transition-transform" />
        </a>
      </GlassCard>
    </Tilt>
  );
}

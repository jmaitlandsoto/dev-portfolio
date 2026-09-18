import * as React from "react";
import { GlassCard } from "./GlassCard";
import { Tilt } from "./motion";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { TextHeading } from "./TextHeading";
import { Experience } from "../types/Experience";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface IInfoCardProps {
  experience: Experience;
}

export function ExperienceCard(props: IInfoCardProps) {
  const {
    company,
    position,
    startDate,
    endDate,
    summary,
    highlights,
    techStack,
    href,
  } = props.experience;

  const cardBody = (
    <Tilt>
      <GlassCard>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TextHeading level={5}>
              {position} - {company}
            </TextHeading>
            <p>
              {startDate} - {endDate}
            </p>
          </div>
          {summary && <p>{summary}</p>}
          <ul className="pl-4 list-disc">
            {highlights.map((highlight, i) => (
              <li key={i} className="mb-1">
                <p className="inline mb-0">{highlight}</p>
              </li>
            ))}
          </ul>
          <SkillBadgeGroup skills={techStack} />
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="self-center"
            >
              <Button variant={"outline"}>
                Learn more <ExternalLink />
              </Button>
            </a>
          )}
        </div>
      </GlassCard>
    </Tilt>
  );

  return cardBody;
}

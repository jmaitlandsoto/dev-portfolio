import * as React from "react";
import { GlassCard } from "./GlassCard";
import { Tilt } from "./motion";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { TextHeading } from "./TextHeading";
import { Experience } from "../types/Experience";

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
                <p className="mb-0 inline">{highlight}</p>
              </li>
            ))}
          </ul>
          <SkillBadgeGroup skills={techStack} />
        </div>
      </GlassCard>
    </Tilt>
  );

  if (!href) {
    return cardBody;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {cardBody}
    </a>
  );
}

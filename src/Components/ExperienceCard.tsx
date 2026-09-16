import * as React from "react";
import { Card } from "react-bootstrap";
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
    <Card
      className="d-flex flex-column gap-1"
      style={{
        marginLeft: "-1.5rem",
        marginRight: "-1.5rem",
        padding: "1.5rem",
      }}
    >
      <div className="d-flex flex-column">
        {/* <div style={{ width: "650px" }}> */}
        <p>
          {startDate} - {endDate}
        </p>
        {/* </div> */}
        <TextHeading level={5}>
          {position} - {company}
        </TextHeading>
        {summary && <p>{summary}</p>}
        <ul className="ps-3 mb-2">
          {highlights.map((highlight, i) => (
            <li key={i} className="mb-1">
              <p className="mb-0 d-inline ">{highlight}</p>
            </li>
          ))}
        </ul>
        <SkillBadgeGroup skills={techStack} />
      </div>
    </Card>
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

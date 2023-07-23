import { Badge, Card } from "react-bootstrap";
import { TextHeading } from "./TextHeading";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { ExperienceCard } from "./ExperienceCard";
import { experience } from "../data/experience";

export interface IExperienceProps {}

export function Experience(props: IExperienceProps) {
  return (
    <section>
      <TextHeading level={2}>Experience</TextHeading>
      <ol className="p-0" style={{listStyle:"none"}}>
        {experience.map((exp, i) => (
          <li key={i} className="mb-5">
            <ExperienceCard experience={exp} />
          </li>
        ))}
      </ol>
    </section>
  );
}

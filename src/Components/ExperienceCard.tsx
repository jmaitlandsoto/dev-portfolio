import * as React from "react";
import { Card } from "react-bootstrap";
import { SkillBadgeGroup } from "./SkillBadgeGroup";
import { TextHeading } from "./TextHeading";
import { Experience } from "../types/Experience";
import { useRef } from "react";

export interface IInfoCardProps {
  experience: Experience;
}

export function ExperienceCard(props: IInfoCardProps) {
  const {
    company,
    position,
    startDate,
    endDate,
    description,
    techStack,
    href,
  } = props.experience;

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
        ref={linkRef} // Assign the linkRef to our link
      >
        <Card
          className="d-flex flex-column gap-1"
          style={{ marginLeft: "-1.5rem" , marginRight: "-1.5rem", padding: "1.5rem" }}
        >
          <div className="d-flex flex-row">
            <div style={{ width: "650px" }}>
              <p>
                {startDate} - {endDate}
              </p>
            </div>
            <div>
              <TextHeading level={5}>
                <a
                  href={href}
                  target="_blank"
                  ref={linkRef} // Assign the linkRef to our link
                >
                  {position} - {company}
                </a>
              </TextHeading>
              <p>{description}</p>
              <SkillBadgeGroup skills={techStack} />
            </div>
          </div>
        </Card>
      </a>
    </>
    // <div className="position-relative">
    //   <Card
    //     className="position-absolute d-block"
    //     style={{
    //       left: "-1.5rem",
    //       right: "-1.5rem",
    //       top: "-1rem",
    //       bottom: "-1rem",
    //       zIndex: 0,
    //     }}
    //     onClick={handleCardClick} // Call our handleCardClick function on Card click
    //   />
    //   <div className="d-flex flex-row">
    //     <div style={{ width: "650px" }}>
    //       <p>
    //         {startDate} - {endDate}
    //       </p>
    //     </div>
    //     <div>
    //       <TextHeading level={5}>
    //         <a
    //           href={href}
    //           target="_blank"
    //           ref={linkRef} // Assign the linkRef to our link
    //         >
    //           {position} - {company}
    //         </a>
    //       </TextHeading>
    //       <p>{description}</p>
    //       <SkillBadgeGroup skills={techStack} />
    //     </div>
    //   </div>
    // </div>
  );
}

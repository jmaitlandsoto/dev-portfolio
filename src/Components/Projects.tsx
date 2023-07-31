import * as React from "react";
import { TextHeading } from "./TextHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";

export interface IProjectsProps {}

export const Projects = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>((props, ref) => {
  return (
    <section {...props} ref={ref}>
      <TextHeading level={2}>Projects</TextHeading>
      <ol className="p-0" style={{ listStyle: "none" }}>
        {projects.map((project, i) => (
          <li key={i} className="mb-5">
            <ProjectCard project={project} />
          </li>
        ))}
      </ol>
    </section>
  );
});

import * as React from "react";
import { TextHeading } from "./TextHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";

export interface IProjectsProps {}

export function Projects(props: IProjectsProps) {
  return (
    <section>
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
}

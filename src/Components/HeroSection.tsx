import * as React from "react";
import portrait from "../assets/josh-portrait.jpg";
import { TextHeading } from "./TextHeading";

export interface IHeroSectionProps {}

export function HeroSection(props: IHeroSectionProps) {
  return (
    <section>
      <div className="flex flex-col gap-8">
        <TextHeading level={1}>Josh Maitland</TextHeading>
        <TextHeading level={4}>Full-Stack Software Engineer</TextHeading>
        <p>
          Building distributed systems, AI agents, and production APIs — from
          architecture through CI/CD delivery. Based in Toronto, ON.
        </p>
        <img src={portrait} alt="Hero" className="hero-image" />
      </div>
    </section>
  );
}

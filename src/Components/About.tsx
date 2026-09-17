import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const About = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>((props, ref) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section {...props} ref={ref} className="flex flex-col">
      <p>
        I'm a full-stack software engineer based in Toronto with 5+ years
        building production APIs, backend systems, and frontend applications
        in TypeScript/Node.js and React. I currently split my time between{" "}
        <em>Iceberg Cyber</em>, where I architect distributed, event-driven
        systems on AWS, and{" "}
        <a href="https://www.gibbly.co">Gibbly</a>, an AI edtech platform I
        co-founded and am the sole developer for, now serving roughly 36,000
        students and educators.
      </p>
      <p>
        Since first integrating OpenAI's API in 2022, I've built a deep
        practice in LLM application engineering — agentic workflows, RAG,
        structured outputs, and evaluation/guardrails for AI systems used by
        minors — alongside distributed systems work orchestrating 1,000+
        concurrent jobs and automating deploy pipelines from 65% to 95%
        success. My path started in 2020 as a coding instructor at RP4K
        while completing my Electrical Engineering degree at TMU, followed by
        game development at Ripple Studios.
      </p>

      {expanded && (
        <p className="mt-4">
          Outside of work, I'm a die-hard Blue Jays fan. I'm also a carpentry
          hobbyist and a lifelong lover of video games, and I play softball
          and volleyball to stay active. When I'm not building something, I'm
          usually travelling or camping with my wife and son.
        </p>
      )}

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setExpanded((prev) => !prev);
        }}
        aria-expanded={expanded}
        className="mt-2 flex items-center justify-center gap-1 self-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? "Less about me" : "More about me"}
        <ChevronDown
          className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </a>
    </section>
  );
});

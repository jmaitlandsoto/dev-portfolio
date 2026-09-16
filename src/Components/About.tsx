import React from "react";

export const About = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>((props, ref) => {
  return (
    <section {...props} ref={ref} className="d-flex flex-column">
      <p>
        I'm a full-stack software engineer based in Toronto with 5+ years
        building production APIs, backend systems, and frontend applications
        in TypeScript/Node.js and React — from architecture through CI/CD
        delivery and production debugging. I currently split my time between{" "}
        <em>Iceberg Cyber</em>, where I architect distributed, event-driven
        systems on AWS, and{" "}
        <a href="https://www.gibbly.co">Gibbly</a>, an AI edtech platform I
        co-founded and am the sole developer for, now serving roughly 36,000
        students and educators.
      </p>
      <p>
        Since first integrating OpenAI's API in 2022, I've built a deep
        practice in LLM application engineering: agentic workflows, RAG,
        structured outputs, evaluation, and guardrails for AI systems used by
        minors. I'm equally at home in distributed systems work — orchestrating
        1,000+ concurrent jobs, designing RBAC for multi-tenant isolation, and
        automating deploy pipelines from 65% to 95% success.
      </p>
      <p>
        My path into software started in 2020 as a coding instructor at RP4K,
        teaching 100+ students while completing my Electrical Engineering
        degree at TMU. From there I led game development at Ripple Studios
        before landing at Gibbly and Iceberg Cyber.
      </p>
      <p>
        Beyond work, I am an avid 3D printing hobbyist, an ADHDer who loves long
        walks with my fiancé, and a proud dog father to our two puppers, Luna
        and Hunny. I also volunteer as a certified Judge Advisor for VEX
        Robotics competitions.
      </p>
    </section>
  );
});

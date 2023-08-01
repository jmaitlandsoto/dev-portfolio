import React from "react";

export const About = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>((props, ref) => {
  return (
    <section {...props} ref={ref} className="d-flex flex-column">
      <p>
        My journey into software began in 2019 at RP4K, where I discovered my
        passion for coding as an instructor all while pursuing my degree in
        Electrical Engineering at TMU. After graduating in 2021 I scored my
        first developer role at Ripple Studios, where I merged my passion for
        teaching and making video games, creating educational mobile games that
        would inspire kids to pursue STEM careers.
      </p>
      <p>
        Currently, I'm an integral part of{" "}
        <a href="https://www.gibbly.co">Gibbly</a>, an edTech startup set to
        revolutionize game-based learning. At Gibbly, I've had the privilege of
        integrating OpenAI's API into our platform, providing me insights into
        prompt design and the power of GPT-4. Fascinated by artificial
        intelligence and machine learning since 2020, I now find myself on the
        cusp of the new wave of tech innovations in my role as a software
        engineer.
      </p>
      <p>
        Beyond work, I am an avid 3D printing hobbyist, an ADHDer who loves long
        walks with my fiancé, and a proud dog father to our two puppers, Luna
        and Hunny. I also freelance, continuously seeking new challenges to
        broaden my horizons in the dynamic world of software and AI.
      </p>
    </section>
  );
});

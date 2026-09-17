import {
  HeroSection,
  Experience,
  Footer,
  Projects,
  Skills,
} from "./Components";
import { About } from "./Components/About";
import React from "react";
import NavSection from "./Components/NavSection";
import CursorFollower from "./Components/CursorFollower";

function App() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const experienceRef = React.useRef<HTMLDivElement>(null);
  const skillsRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <CursorFollower />
      <div className="relative max-w-screen-xl mx-auto p-6 py-8 md:py-24">
        <div className="flex flex-col md:flex-row gap-18 md:gap-12">
          <div className="p-1 w-full md:w-5/12 md:ml-[8.333%] md:sticky md:top-24 md:h-[100dvh] flex flex-col justify-start md:overflow-hidden gap-12 ">
            <HeroSection />
            <NavSection
              aboutRef={aboutRef}
              experienceRef={experienceRef}
              skillsRef={skillsRef}
              projectsRef={projectsRef}
            />
            <Footer />
          </div>

          <div className="flex-1 p-1">
            <main className="flex flex-col gap-18">
              <About ref={aboutRef} />
              <Experience ref={experienceRef} />
              <Skills ref={skillsRef} />
              <Projects ref={projectsRef} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

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
      <div className="relative max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-5/12 md:ml-[8.333%] md:sticky md:top-0 md:h-[100dvh] flex flex-col justify-between md:overflow-hidden gap-6 pt-8 pb-4 md:pt-24 md:pb-24">
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
            <main className="flex flex-col gap-1">
              <About ref={aboutRef} style={{ paddingTop: "6rem" }} />
              <Experience ref={experienceRef} style={{ paddingTop: "6rem" }} />
              <Skills ref={skillsRef} style={{ paddingTop: "6rem" }} />
              <Projects ref={projectsRef} style={{ paddingTop: "6rem" }} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

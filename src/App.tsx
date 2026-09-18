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

const ParticleBackground = React.lazy(
  () => import("./Components/ParticleBackground"),
);

function App() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const experienceRef = React.useRef<HTMLDivElement>(null);
  const skillsRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <CursorFollower />
      <React.Suspense fallback={null}>
        <ParticleBackground />
      </React.Suspense>
      <div className="relative mx-auto px-6 py-8 md:py-24 max-w-screen-xl">
        <div className="flex md:flex-row flex-col gap-12">
          <div className="md:top-24 md:sticky flex flex-col justify-start gap-12 md:ml-[8.333%] w-full md:w-5/12 md:h-[100dvh] md:overflow-hidden">
            <HeroSection />
            <NavSection
              aboutRef={aboutRef}
              experienceRef={experienceRef}
              skillsRef={skillsRef}
              projectsRef={projectsRef}
            />
            <Footer />
          </div>

          <div className="flex-1">
            <main className="flex flex-col gap-12 px-2 md:px-0">
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

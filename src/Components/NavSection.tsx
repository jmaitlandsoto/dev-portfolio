import * as React from "react";
import { NavButton } from "./NavButton";

export interface INavSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
  experienceRef: React.RefObject<HTMLDivElement>;
  projectsRef: React.RefObject<HTMLDivElement>;
}

export default function NavSection(props: INavSectionProps) {
  const { aboutRef, experienceRef, projectsRef } = props;

  const [currentHash, setCurrentHash] = React.useState(window.location.hash);

  const handleHashChange = React.useCallback(() => {
    setCurrentHash(window.location.hash);
  }, [window.location.hash]);

  React.useEffect(() => {
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup after unmount
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const aboutSection = aboutRef.current;
      const projectsSection = projectsRef.current;
      const experienceSection = experienceRef.current;

      if (aboutSection && projectsSection && experienceSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const projectsRect = projectsSection.getBoundingClientRect();
        const experienceRect = experienceSection.getBoundingClientRect();

        console.log(experienceRect.top);

        if (projectsRect.top <= 100) {
          window.location.hash = "#projects";
        } else if (experienceRect.top <= 100) {
          window.location.hash = "#experience";
        } else if (aboutRect.top <= 100) {
          window.location.hash = "#about";
        }
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToComponent(element: HTMLDivElement | null) {
    if (element === null) return console.error("Element is null");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className="d-flex flex-column gap-3 align-items-start">
      <NavButton
        href="#about"
        currentHash={currentHash}
        onClick={() => scrollToComponent(aboutRef.current)}
      >
        About
      </NavButton>
      <NavButton
        href="#experience"
        currentHash={currentHash}
        onClick={() => scrollToComponent(experienceRef.current)}
      >
        Experience
      </NavButton>
      <NavButton
        href="#projects"
        currentHash={currentHash}
        onClick={() => scrollToComponent(projectsRef.current)}
      >
        Projects
      </NavButton>
    </nav>
  );
}

import { Button, Col, Container, Row } from "react-bootstrap";
import { HeroSection, Experience, Footer, Projects } from "./Components";
import { About } from "./Components/About";
import React from "react";
import { NavButton } from "./Components/NavButton";
import NavSection from "./Components/NavSection";

function App() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const experienceRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Row className="gap-5">
          <Col
            lg={{ offset: 1, span: 4 }}
            className="d-flex flex-column position-sticky justify-content-between overflow-none top-0"
            style={{
              height: "100dvh",
              paddingTop: "6rem",
              paddingBottom: "6rem",
            }}
          >
            <HeroSection />
            <NavSection
              aboutRef={aboutRef}
              experienceRef={experienceRef}
              projectsRef={projectsRef}
            />
            <Footer />
          </Col>

          <Col lg={5}>
            <main className="d-flex flex-column gap-1">
              <About ref={aboutRef} style={{ paddingTop: "6rem" }} />
              <Experience ref={experienceRef} style={{ paddingTop: "6rem" }} />
              <Projects ref={projectsRef} style={{ paddingTop: "6rem" }} />
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

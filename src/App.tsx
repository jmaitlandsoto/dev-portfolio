import { Button, Col, Container, Row } from "react-bootstrap";
import { HeroSection, Experience, Footer, Projects } from "./Components";
import { About } from "./Components/About";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Container>
        <Row className="gap-5">
          <Col
            lg={{ offset: 1, span: 4 }}
            className="d-flex flex-column position-sticky justify-content-between overflow-none top-0"
            style={{ height: "100dvh", paddingTop: "6rem" }}
          >
            <HeroSection />
            <nav className="d-flex flex-column gap-2 align-items-start">
              <Button variant="primary">About</Button>
              <Button variant="primary">Experience</Button>
              <Button variant="primary">Projects</Button>
            </nav>
            <Footer />
          </Col>

          <Col lg={5} style={{ paddingTop: "6rem" }}>
            <main className="d-flex flex-column gap-5">
              <About />
              <Experience />
              <Projects />
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

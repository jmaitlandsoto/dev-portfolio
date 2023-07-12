import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import {
  Header,
  HeroSection,
  Experience,
  GameSection,
  Footer,
} from "./Components";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={6} >
            <HeroSection />
            <Footer />
          </Col>
          <Col lg={6}>
            <Experience />
            <GameSection />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import portrait from "../assets/josh-portrait.jpg";

export interface IHeroSectionProps {}

export function HeroSection(props: IHeroSectionProps) {
  return (
    <section className="d-flex align-items-center hero-section">
      <Container>
        <Row className="justify-content-end">
          <Col className="col-md-6 d-flex flex-column justify-content-center align-items-end text-end gap-4">
            <img src={portrait} alt="Hero" className="hero-image" />
            <h1 className="mb-4 align-self-end">Innovating Education Through Technology</h1>
            <p className="mb-4">
              Creating immersive learning experiences with game development and
              AI-driven web platforms.
            </p>
            <Button variant="primary" size="lg">
              View My Projects
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 text-center mt-5"></Col>
        </Row>
      </Container>
    </section>
  );
}

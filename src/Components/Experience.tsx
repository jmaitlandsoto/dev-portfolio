import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import portrait from "../assets/josh-portrait.jpg";

export interface IExperienceProps {}

export function Experience(props: IExperienceProps) {
  return (
    <section className="d-flex align-items-center hero-section">
      <Container>
        <Row>
          <Col md={8} className="mx-auto text-center">
            <h2 className="section-title">
              Gibbly: Revolutionizing Educational Content Creation
            </h2>
            <p className="section-subtitle">
              Leading the charge in transforming game-based learning with
              AI-powered solutions.
            </p>
            <p className="section-text">
              As a full stack developer, I've been instrumental in the
              development of Gibbly, an innovative education platform that
              accelerates course material creation. Gibbly utilizes AI to
              revolutionize game-based learning, providing a unique and
              effective learning experience.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import portrait from "../assets/josh-portrait.jpg";
import { TextHeading } from "./TextHeading";

export interface IHeroSectionProps {}

export function HeroSection(props: IHeroSectionProps) {
  return (
    <section className="hero-section">
      <Container>
        <Row className="justify-content-start">
          <Col lg={12} className="d-flex flex-column  gap-4" >
            <TextHeading level={1}>Josh Maitland</TextHeading>
            <TextHeading level={4}>
              Lead Engineer at Gibbly Inc.
            </TextHeading>
            <p className="mb-4">
              Creating immersive learning experiences with AI-powered web platforms and game development.
            </p>
            <img src={portrait} alt="Hero" className="hero-image" />
          </Col>
        </Row>        
      </Container>
    </section>
  );
}

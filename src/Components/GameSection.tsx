import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import portrait from "../assets/josh-portrait.jpg";

export interface IHeroSectionProps {}

export function GameSection(props: IHeroSectionProps) {
  return (
    <section id="game-dev" className="py-5">
    <Container>
      <Row>
        <Col md={8} className="mx-auto text-center">
          <h2 className="section-title">Game Development: Merging Fun and Learning</h2>
          <p className="section-subtitle">Crafting engaging mobile games to inspire the next generation of STEM professionals.</p>
          <p className="section-text">
            My journey in game development began with creating educational mobile games. 
            I aimed to make learning fun and interactive, promoting STEM careers to the youth. 
            My games not only entertain but also educate, serving as a bridge between entertainment and education.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
  );
}

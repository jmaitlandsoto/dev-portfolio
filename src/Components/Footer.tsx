import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import portrait from "../assets/josh-portrait.jpg";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col className="text-center">
            <p>© {currentYear} Your Name</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" rel="noreferrer">LinkedIn</a> | 
            <a href="https://github.com/your-github-profile" target="_blank" rel="noreferrer"> GitHub</a> | 
            <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noreferrer"> Twitter</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

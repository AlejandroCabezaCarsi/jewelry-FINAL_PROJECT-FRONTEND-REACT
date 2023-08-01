import React from "react";
import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <div className="footerDesign d-flex align-items-center">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            Project made by: Alejandro Cabeza Carsí
          </Col>
          <Col className="d-flex justify-content-center">
            Contact: cabezacarsialejandro@gmail.com
          </Col>
        </Row>
      </Container>
    </div>
  );
};

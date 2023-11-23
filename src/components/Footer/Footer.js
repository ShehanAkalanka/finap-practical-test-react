import React from "react";
import { Container,Row,Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="mt-5">
      <Row>
        <Col className="bg-light border">
          <h5 className="text-secondary">
            Copyright &copy; Fintechnology Asia Pacific Lanka Private Limited
          </h5>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;

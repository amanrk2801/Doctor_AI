import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col lg={3} md={6} className="mb-3">
            <h6>
              <i className="fas fa-stethoscope me-2"></i>
              AI Medical Symptom Checker
            </h6>
            <p className="small text-muted mb-0">
              Providing AI-powered medical guidance and symptom analysis. Always
              consult healthcare professionals for proper medical care.
            </p>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/ai-chat" className="text-light text-decoration-none">
                  AI Chat
                </a>
              </li>
              <li>
                <a
                  href="/conditions"
                  className="text-light text-decoration-none"
                >
                  Conditions
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={7} md={12}>
            <h6>Emergency & Medical Services (India)</h6>
            <Row>
              <Col md={6}>
                <div className="small">
                  <p className="mb-1 text-danger">
                    <i className="fas fa-ambulance me-2"></i>
                    <strong>108</strong> - Advanced Medical Emergency
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-ambulance me-2"></i>
                    <strong>102</strong> - Government Ambulance (Basic)
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-phone me-2"></i>
                    <strong>1298</strong> - Private Ambulance (Red Cross)
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-stethoscope me-2"></i>
                    <strong>104</strong> - Medical Advice & Blood Bank
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-baby me-2"></i>
                    <strong>1097</strong> - Pregnancy/Maternal Helpline
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="small">
                  <p className="mb-1">
                    <i className="fas fa-user-friends me-2"></i>
                    <strong>14567</strong> - Senior Citizen Helpline
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-ribbon me-2"></i>
                    <strong>1097</strong> - AIDS/Health Helpline
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-brain me-2"></i>
                    <strong>1800-599-0019</strong> - Mental Health (KIRAN)
                  </p>
                  <p className="mb-0 text-muted">
                    <i className="fas fa-globe me-2"></i>
                    <strong>911</strong> - International Emergency
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <small className="text-muted">
              © 2025 AI Medical Symptom Checker. For educational purposes only.
              Not a substitute for professional medical advice.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

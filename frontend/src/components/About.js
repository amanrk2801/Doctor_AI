import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="card-custom">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="fas fa-info-circle fa-3x text-primary mb-3"></i>
                <h1 className="card-title">About Our AI Medical Assistant</h1>
                <p className="text-muted">
                  Advanced medical symptom analysis powered by AI technology
                </p>
              </div>

              <Row>
                <Col md={6} className="mb-4">
                  <div className="text-center">
                    <i className="fas fa-brain fa-2x text-primary mb-3"></i>
                    <h5>AI-Powered Analysis</h5>
                    <p className="text-muted">
                      Our system uses advanced AI to analyze symptoms and provide 
                      intelligent medical guidance with conversational responses.
                    </p>
                  </div>
                </Col>
                
                <Col md={6} className="mb-4">
                  <div className="text-center">
                    <i className="fas fa-database fa-2x text-primary mb-3"></i>
                    <h5>Medical Database</h5>
                    <p className="text-muted">
                      Comprehensive database of medical conditions, symptoms, 
                      and treatments for accurate symptom matching.
                    </p>
                  </div>
                </Col>
                
                <Col md={6} className="mb-4">
                  <div className="text-center">
                    <i className="fas fa-shield-alt fa-2x text-primary mb-3"></i>
                    <h5>Safety First</h5>
                    <p className="text-muted">
                      Built with medical safety in mind, always recommending 
                      professional healthcare consultation for proper diagnosis.
                    </p>
                  </div>
                </Col>
                
                <Col md={6} className="mb-4">
                  <div className="text-center">
                    <i className="fas fa-mobile-alt fa-2x text-primary mb-3"></i>
                    <h5>Accessible Anywhere</h5>
                    <p className="text-muted">
                      Responsive design works perfectly on desktop, tablet, 
                      and mobile devices for health guidance on the go.
                    </p>
                  </div>
                </Col>
              </Row>

              <div className="mt-4">
                <h5>How It Works</h5>
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item border-0 bg-transparent">
                    <strong>Enter Symptoms:</strong> Describe your symptoms in natural language
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <strong>AI Analysis:</strong> Our AI analyzes and matches symptoms to conditions
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <strong>Get Guidance:</strong> Receive possible conditions and treatment suggestions
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <strong>Consult Professional:</strong> Always follow up with healthcare providers
                  </li>
                </ol>
              </div>

              <div className="disclaimer-box mt-4 p-3">
                <h6><i className="fas fa-exclamation-triangle text-warning me-2"></i>Important Disclaimer</h6>
                <p className="mb-0 small">
                  This AI medical assistant is designed for informational and educational purposes only. 
                  It should never be used as a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of qualified healthcare providers with any questions regarding medical conditions. 
                  In case of medical emergencies, contact emergency services immediately.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
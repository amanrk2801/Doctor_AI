import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError('Please enter some symptoms');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await axios.post('/analyze', {
        symptoms: symptoms
      });

      if (response.data.error) {
        setError(response.data.message);
      } else {
        setResults(response.data);
      }
    } catch (err) {
      setError('An error occurred while analyzing your symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="card-custom">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="fas fa-user-md fa-3x text-primary mb-3"></i>
                <h1 className="card-title">Symptom Checker</h1>
                <p className="text-muted">
                  Enter your symptoms to get AI-powered analysis with possible conditions and treatments
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>
                    <i className="fas fa-notes-medical me-2"></i>
                    Enter your symptoms (separated by commas)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g., fever, headache, cough, fatigue"
                    required
                  />
                  <Form.Text className="text-muted">
                    Examples: fever, headache, cough, nausea, body aches, sore throat
                  </Form.Text>
                </Form.Group>

                <div className="mb-4">
                  <p className="small text-muted mb-2">Quick symptom buttons:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {['fever', 'headache', 'cough', 'nausea', 'fatigue', 'sore throat'].map((symptom) => (
                      <Button
                        key={symptom}
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          const currentSymptoms = symptoms ? symptoms + ', ' : '';
                          setSymptoms(currentSymptoms + symptom);
                        }}
                      >
                        + {symptom}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="d-grid">
                  <Button 
                    type="submit" 
                    className="btn-gradient btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          className="me-2"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Analyze Symptoms
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              {error && (
                <Alert variant="danger" className="mt-4">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              {results && (
                <div className="mt-4">
                  <Alert variant="info">
                    <strong>Symptoms analyzed:</strong> {results.symptoms_entered.join(', ')}
                  </Alert>
                  
                  <h5 className="mb-3">Possible Conditions:</h5>
                  
                  {results.matches.map((match, index) => (
                    <Card key={index} className="result-card mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="card-title text-primary">
                              <i className="fas fa-diagnoses me-2"></i>
                              {match.condition}
                            </h6>
                            <p className="card-text">
                              <strong>Treatment:</strong> {match.treatment}
                            </p>
                            <small className="text-muted">
                              Match score: {match.match_score}/{match.total_symptoms} symptoms
                            </small>
                          </div>
                          <Badge bg="primary" className="ms-2">
                            #{index + 1}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                  
                  <Alert variant="warning" className="mt-3">
                    <i className="fas fa-info-circle me-2"></i>
                    {results.disclaimer}
                  </Alert>
                </div>
              )}
            </Card.Body>
          </Card>

          <div className="disclaimer-box mt-4 p-3">
            <div className="d-flex align-items-center">
              <i className="fas fa-exclamation-triangle text-warning me-2"></i>
              <small>
                <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and should not replace professional medical advice. 
                Always consult with a qualified healthcare provider for proper diagnosis and treatment.
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
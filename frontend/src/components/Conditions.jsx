import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

function Conditions() {
  const [conditions, setConditions] = useState([]);
  const [filteredConditions, setFilteredConditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConditions();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = conditions.filter(condition =>
        condition.conclusion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        condition.treatment.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConditions(filtered);
    } else {
      setFilteredConditions(conditions);
    }
  }, [searchTerm, conditions]);

  const fetchConditions = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CONDITIONS);
      setConditions(response.data);
      setFilteredConditions(response.data);
    } catch (err) {
      setError('Failed to load conditions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading medical conditions...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Alert variant="danger">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="card-custom">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="fas fa-list-alt fa-3x text-primary mb-3"></i>
                <h1 className="card-title">Medical Conditions Database</h1>
                <p className="text-muted">Browse all conditions in our database</p>
              </div>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search conditions or treatments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>

              <Row>
                {filteredConditions.map((condition, index) => (
                  <Col md={6} key={index} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <h6 className="card-title text-primary">
                          <i className="fas fa-diagnoses me-2"></i>
                          {condition.conclusion}
                        </h6>
                        <p className="card-text">
                          <strong>Treatment:</strong> {condition.treatment}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {filteredConditions.length === 0 && searchTerm && (
                <div className="text-center py-4">
                  <i className="fas fa-search fa-2x text-muted mb-3"></i>
                  <p className="text-muted">No conditions found matching "{searchTerm}"</p>
                </div>
              )}

              <div className="text-center mt-4">
                <p className="text-muted">
                  Total conditions: {filteredConditions.length}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Conditions;

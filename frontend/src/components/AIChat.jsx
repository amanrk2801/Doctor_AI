import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI medical assistant powered by Gemini. I can help you understand your symptoms and provide medical information. Please describe how you're feeling.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post(API_ENDPOINTS.GEMINI_CHAT, {
        message: currentMessage,
        conversation_history: messages,
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: response.data.response,
        timestamp: new Date(),
        source: response.data.source || "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again later or use the basic symptom checker.",
        timestamp: new Date(),
        source: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="card-custom">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex align-items-center">
                <i className="fas fa-robot me-2"></i>
                <h5 className="mb-0">AI Medical Assistant</h5>
                <small className="ms-auto">Powered by Gemini AI</small>
              </div>
            </Card.Header>

            <Card.Body className="p-0">
              <div className="chat-container">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.type}`}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        {message.type === "ai" && (
                          <div className="d-flex align-items-center mb-1">
                            <i className="fas fa-robot me-2"></i>
                            <small className="fw-bold">AI Assistant</small>
                          </div>
                        )}
                        <div>{message.content}</div>
                      </div>
                      <small className="text-muted ms-2">
                        {formatTime(message.timestamp)}
                      </small>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="message ai">
                    <div className="typing-indicator">
                      <i className="fas fa-robot me-2"></i>
                      <span>AI is typing</span>
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </Card.Body>

            <Card.Footer>
              {messages.length === 1 && (
                <div className="mb-3">
                  <small className="text-muted">Try asking:</small>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {[
                      "I have a headache and feel nauseous",
                      "What should I do about a fever?",
                      "I've been coughing for days",
                      "My stomach hurts",
                    ].map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setInputMessage(suggestion)}
                        disabled={isTyping}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Describe your symptoms or ask a medical question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    className="btn-gradient"
                    disabled={isTyping || !inputMessage.trim()}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Card.Footer>
          </Card>

          <div className="disclaimer-box mt-4 p-3">
            <div className="d-flex align-items-center">
              <i className="fas fa-info-circle text-info me-2"></i>
              <small>
                <strong>AI Chat Disclaimer:</strong> This AI assistant provides
                general medical information and should not be used for emergency
                situations. For urgent medical concerns, please contact
                emergency services or your healthcare provider immediately.
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AIChat;

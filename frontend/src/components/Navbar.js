import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="navbar-custom" variant="dark">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand>
            <i className="fas fa-stethoscope me-2"></i>
            AI Medical Symptom Checker
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fas fa-home me-1"></i>
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ai-chat">
              <Nav.Link>
                <i className="fas fa-robot me-1"></i>
                AI Chat
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/conditions">
              <Nav.Link>
                <i className="fas fa-list-alt me-1"></i>
                Conditions
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>
                <i className="fas fa-info-circle me-1"></i>
                About
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
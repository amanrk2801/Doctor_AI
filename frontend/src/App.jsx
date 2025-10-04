import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.jsx';
import Conditions from './components/Conditions.js';
import AIChat from './components/AIChat.js';
import About from './components/About.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <Router>
      <div className="gradient-bg min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
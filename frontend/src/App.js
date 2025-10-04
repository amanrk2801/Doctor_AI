import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Conditions from './components/Conditions';
import AIChat from './components/AIChat';
import About from './components/About';
import Footer from './components/Footer';

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
// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-buttons">
        <Link to="/login" className="landing-btn">Login</Link>
        <Link to="/signup" className="landing-btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;

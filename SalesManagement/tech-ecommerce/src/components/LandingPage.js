// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Our E-Commerce Site</h1>
      <p>Shop the best products at unbeatable prices!</p>
      <div className="landing-buttons">
        <Link to="/login" className="landing-btn">Login</Link>
        <Link to="/signup" className="landing-btn">Sign Up</Link> {/* Sign Up Route Placeholder */}
      </div>
    </div>
  );
};

export default LandingPage;
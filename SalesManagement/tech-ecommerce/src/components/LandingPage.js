// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero-section">
        <h1>Welcome to Our E-Commerce Site</h1>
        <p className="hero-subtitle">Shop the best products at unbeatable prices!</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-btn">Login</Link>
          <Link to="/signup" className="landing-btn">Sign Up</Link> 
        </div>
      </header>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Quality Products</h3>
            <p>We offer only the best products to our customers.</p>
          </div>
          <div className="feature">
            <h3>Fast Shipping</h3>
            <p>Your order will arrive at your doorstep in no time!</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>Our team is here to help you whenever you need it.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

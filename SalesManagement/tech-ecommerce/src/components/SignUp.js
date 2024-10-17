// src/components/SignUp.js
import React from 'react';
import './SignUp.css'; // Import CSS for styling

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        {/* First Name Field */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" required />
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" required />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>

        {/* House Number Field */}
        <div className="form-group">
          <label htmlFor="houseNumber">House Number:</label>
          <input type="text" id="houseNumber" required />
        </div>

        {/* Street Name Field */}
        <div className="form-group">
          <label htmlFor="streetName">Street Name:</label>
          <input type="text" id="streetName" required />
        </div>

        {/* Pincode Field */}
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" required />
        </div>

        {/* City Field */}
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" required />
        </div>

        {/* Submit Button */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
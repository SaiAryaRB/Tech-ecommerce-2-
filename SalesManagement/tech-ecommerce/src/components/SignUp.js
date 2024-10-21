// src/components/SignUp.js
import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';  // Import CSS for styling

const SignUp = () => {
  const navigate = useNavigate();
  // State to hold form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    houseNumber: '',
    streetName: '',
    pincode: '',
    city: '',
    password: '',
    phoneNumber1: '', // First phone number (required)
    phoneNumber2: '', // Second phone number (optional)
    phoneNumber3: ''  // Third phone number (optional)
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate that the first phone number is provided
    if (!formData.phoneNumber1) {
      alert('First phone number is required.');
      return;
    }

    // Create a comma-separated string of phone numbers
    const phoneNumbers = [formData.phoneNumber1, formData.phoneNumber2, formData.phoneNumber3]
      .filter(Boolean) // Filter out any empty values
      .join(','); // Join the numbers with commas

    const dataToSend = { 
      ...formData, 
      phoneNumbers // Add the merged phone numbers to the data to send
    };

    try {
      console.log(JSON.stringify(dataToSend))
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sign Up successful:', result);
        navigate('/login');
      } else {
        const error = await response.json();
        console.error('Sign Up failed:', error);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name Field */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* House Number Field */}
        <div className="form-group">
          <label htmlFor="houseNumber">House Number:</label>
          <input type="text" id="houseNumber" value={formData.houseNumber} onChange={handleChange} required />
        </div>

        {/* Street Name Field */}
        <div className="form-group">
          <label htmlFor="streetName">Street Name:</label>
          <input type="text" id="streetName" value={formData.streetName} onChange={handleChange} required />
        </div>

        {/* Pincode Field */}
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" value={formData.pincode} onChange={handleChange} required />
        </div>

        {/* City Field */}
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange} required />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* Phone Number 1 Field (Compulsory) */}
        <div className="form-group">
          <label htmlFor="phoneNumber1">Phone Number 1 (required):</label>
          <input type="text" id="phoneNumber1" value={formData.phoneNumber1} onChange={handleChange} required />
        </div>

        {/* Phone Number 2 Field (Optional) */}
        <div className="form-group">
          <label htmlFor="phoneNumber2">Phone Number 2 (optional):</label>
          <input type="text" id="phoneNumber2" value={formData.phoneNumber2} onChange={handleChange} />
        </div>

        {/* Phone Number 3 Field (Optional) */}
        <div className="form-group">
          <label htmlFor="phoneNumber3">Phone Number 3 (optional):</label>
          <input type="text" id="phoneNumber3" value={formData.phoneNumber3} onChange={handleChange} />
        </div>

        {/* Submit Button */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

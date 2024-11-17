import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [animationClass, setAnimationClass] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    houseNumber: '',
    streetName: '',
    pincode: '',
    city: '',
    password: '',
    phoneNumber1: '',
    phoneNumber2: '',
    phoneNumber3: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Validate password on change
    if (id === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number.");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character.");
    return errors.join(' ');
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('First Name, Last Name, and Email are required.');
      return false;
    }
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.houseNumber || !formData.streetName || !formData.pincode || !formData.city) {
      alert('All address fields are required.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.phoneNumber1) {
      alert('At least one phone number is required.');
      return false;
    }
    if (!validatePhoneNumber(formData.phoneNumber1)) {
      alert('Phone number 1 must be 10 digits and contain only numbers.');
      return false;
    }
    if (formData.phoneNumber2 && !validatePhoneNumber(formData.phoneNumber2)) {
      alert('Phone number 2 must be 10 digits and contain only numbers.');
      return false;
    }
    if (formData.phoneNumber3 && !validatePhoneNumber(formData.phoneNumber3)) {
      alert('Phone number 3 must be 10 digits and contain only numbers.');
      return false;
    }

    if (!formData.password) {
      alert('Password is required.');
      return false;
    }

    if (passwordError) {
      alert(passwordError);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;

    setAnimationClass('exiting-to-left');
    setTimeout(() => {
      setStep(step + 1);
      setAnimationClass('entering-from-right');
    }, 500);
  };

  const handleBack = () => {
    setAnimationClass('exiting-to-right');
    setTimeout(() => {
      setStep(step - 1);
      setAnimationClass('entering-from-left');
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneNumbers = [formData.phoneNumber1, formData.phoneNumber2, formData.phoneNumber3]
      .filter(Boolean)
      .join(',');

    const dataToSend = { 
      ...formData, 
      phoneNumbers
    };

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        //const result = await response.json();
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
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-step ${step === 1 ? 'active' : ''} ${animationClass}`}>
            <div className="form-group">
              <input type="text" id="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" id="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="button" onClick={handleNext}>Next</button>
          </div>

          <div className={`form-step ${step === 2 ? 'active' : ''} ${animationClass}`}>
            <div className="form-group">
              <input type="text" id="houseNumber" placeholder="House Number" value={formData.houseNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" id="streetName" placeholder="Street Name" value={formData.streetName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" id="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" id="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            </div>
            <button type="button" className="back-button" onClick={handleBack}>Back</button>
            <button type="button" onClick={handleNext}>Next</button>
          </div>

          <div className={`form-step ${step === 3 ? 'active' : ''} ${animationClass}`}>
            <div className="form-group">
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="form-group">
              <input type="tel" id="phoneNumber1" placeholder="Phone Number (required)" value={formData.phoneNumber1} onChange={handleChange} required pattern="[0-9]{10}" />
            </div>
            <div className="form-group">
              <input type="tel" id="phoneNumber2" placeholder="Phone Number (optional)" value={formData.phoneNumber2} onChange={handleChange} pattern="[0-9]{10}" />
            </div>
            <div className="form-group">
              <input type="tel" id="phoneNumber3" placeholder="Phone Number (optional)" value={formData.phoneNumber3} onChange={handleChange} pattern="[0-9]{10}" />
            </div>
            <button type="button" className="back-button" onClick={handleBack}>Back</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

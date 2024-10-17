import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css'; // Import CSS for styling

const Login = () => {
  const [userType, setUserType] = useState('customer'); // State to track user type
  const [email, setEmail] = useState(''); // State to track email
  const [password, setPassword] = useState(''); // State to track password
  const [error, setError] = useState(''); // State to track error messages
  const [success, setSuccess] = useState(''); // State to track success messages

  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError(''); // Clear error when user type changes
    setSuccess(''); // Clear success message when user type changes
    console.log(`User type changed to: ${type}`); // Debugging message for user type change
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Debugging messages to see the current state values before submission
    console.log('Form Submitted');
    console.log(`User Type: ${userType}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    try {
      // Make the API request based on userType
      const url = userType === 'admin' 
        ? 'http://localhost:3000/auth/admin/login' 
        : 'http://localhost:3000/auth/login'; // Adjust the URL based on user type

      console.log(`Attempting to log in with URL: ${url}`); // Debugging message to check the URL

      const response = await axios.post(url, {
        email,
        password,
      });

      console.log('API response:', response); // Debugging message for successful API response

      // Handle success
      setSuccess(userType === 'admin' ? 'Admin login successful' : 'Login Successful');
      setError(''); // Clear any previous error messages

      // Optionally, you can clear the input fields after a successful login
      setEmail('');
      setPassword('');

      // Redirect based on userType
      if (userType === 'admin') {
        console.log('Redirecting to Admin Dashboard'); // Debugging message for admin redirect
        navigate('/admin/dashboard'); // Redirect to Admin Dashboard
      } else {
        console.log('Redirecting to Products Page'); // Debugging message for customer redirect
        navigate('/products'); // Redirect to Products Page
      }

    } catch (err) {
      // Handle error
      console.log('API error:', err); // Debugging message to see any API error

      if (err.response) {
        console.log('Error response from API:', err.response.data); // Log the specific error from API response
        setError(err.response.data.message); // Set error message from the response
        setSuccess(''); // Clear any previous success messages
      } else {
        setError('An error occurred. Please try again later.'); // Generic error message
        setSuccess(''); // Clear any previous success messages
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-toggle">
        <button
          className={`toggle-button ${userType === 'customer' ? 'active' : ''}`}
          onClick={() => handleUserTypeChange('customer')}
        >
          Customer Login
        </button>
        <button
          className={`toggle-button ${userType === 'admin' ? 'active' : ''}`}
          onClick={() => handleUserTypeChange('admin')}
        >
          Admin Login
        </button>
      </div>
      <h2>{userType === 'admin' ? 'Admin Login' : 'Customer Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Show error message if present */}
        {success && <p className="success-message">{success}</p>} {/* Show success message if present */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

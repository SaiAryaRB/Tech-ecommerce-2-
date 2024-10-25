// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage for customerId (or clear all if necessary)
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('role');
    // Or to clear everything: sessionStorage.clear();
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>E-Commerce</h2>
      <ul className="nav-links">
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
        <li>
          <Link to="/customer-details">Customer Details</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

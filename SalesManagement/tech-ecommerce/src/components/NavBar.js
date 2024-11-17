// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
  <img src="/Logo_Navbar.png" alt="logo" class="navbar-logo" />
</div>
      <ul className="nav-links">
        <li>
          <button className="nav-button">
            <Link to="/cart">CART</Link>
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-button">
            LOGOUT
          </button>
        </li>
        <li>
          <button className="nav-button">
            <Link to="/customer-details">CUSTOMER DETAILS</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

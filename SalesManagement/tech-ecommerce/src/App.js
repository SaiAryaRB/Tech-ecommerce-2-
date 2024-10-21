// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp'
import ProductPage from './components/ProductPage';
import Cart from './components/Cart'; // Placeholder for future Cart page
import AdminDashboard from './components/AdminHomePage'; // Admin Dashboard component
import InventoryManagement from './components/InventoryManagement'; // Inventory Management placeholder
import ReportGeneration from './components/ReportGeneration'; // Report Generation placeholder
import CustomerDetails from './components/CustomerDetails'; 
import OrderConfirmation from './components/OrderConfirmation';

const App = () => {
  // Simulated login function (for testing purposes)
  const handleLogin = (type) => {
    console.log(`Logged in as: ${type}`); // Logging login type for testing
  };

  return (
    <Router>
      

      <Routes>
        {/* Default route: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />} // Pass login handler to Login component
        />

        {/* SignUp Page */}
        <Route
          path="/SignUp"
          element={<SignUp />} // Pass login handler to Login component
        />

        {/* Product Page: Accessible without restriction */}
        <Route path="/products" element={<ProductPage />} />

        {/* Cart Page: Placeholder for future implementation */}
        <Route path="/cart" element={<Cart />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />

        <Route path='/customer-details' element={<CustomerDetails />} />

        {/* Admin-Specific Routes: Accessible without restriction for now */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="/admin/report" element={<ReportGeneration />} />

        {/* Catch-all route to redirect to the Landing Page if route not found */}
        <Route path="*" element={<LandingPage />} />
      </Routes>

      
    </Router>
  );
};

export default App;
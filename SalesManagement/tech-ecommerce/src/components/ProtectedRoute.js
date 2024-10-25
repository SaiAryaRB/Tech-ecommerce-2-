// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const userRole = sessionStorage.getItem('role'); // Get role from sessionStorage

  // Check if userRole matches the required role
  if (userRole !== role) {
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('role');
    return <Navigate to="/login" />;
     // Redirect to login if not authorized
  }

  return <Outlet />; // Render child routes if authorized
};

export default ProtectedRoute;

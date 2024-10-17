// src/components/CustomerDetails.js
import React, { useState } from 'react';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    // logic to fetch customer data from server
  };

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <button onClick={fetchCustomers}>Load Customer Profiles</button>
      <div>
        {customers.map(customer => (
          <div key={customer.id}>
            <h3>{customer.name}</h3>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
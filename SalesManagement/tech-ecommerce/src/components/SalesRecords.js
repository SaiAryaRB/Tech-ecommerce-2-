// src/components/SalesRecords.js
import React, { useState } from 'react';

const SalesRecords = () => {
  const [sales, setSales] = useState([]);

  const fetchSalesRecords = () => {
    // logic to fetch sales data from server
  };

  return (
    <div className="sales-records">
      <h2>Sales Records</h2>
      <button onClick={fetchSalesRecords}>Load Sales Data</button>
      <div>
        {sales.map(sale => (
          <div key={sale.id}>
            <h3>Order #{sale.orderId}</h3>
            <p>Customer: {sale.customerName}</p>
            <p>Total: {sale.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './admin.css';
import { Line } from 'react-chartjs-2';
import { FaBoxOpen, FaFileAlt } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminHomePage = () => {
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);
  const adminName = "Admin"; // You can update this with dynamic values later when backend is ready

  // Fetch sales data from backend
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sales');  
        setSalesData(response.data);
      } catch (err) {
        setError('Failed to fetch sales data');
        console.error(err);
      }
    };

    fetchSalesData();
  }, []);

  // Prepare chart data
  const data = {
    labels: salesData ? salesData.dailySales.map(sale => sale.day) : [],
    datasets: [
      {
        label: 'Daily Sales ($)',
        data: salesData ? salesData.dailySales.map(sale => sale.totalSales) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <div className="welcome-section">
        <h1>Welcome, {adminName}!</h1>
        <p>Here are this month's stats and management options.</p>
      </div>

      <div className="dashboard-content">
        {/* Sales Statistics Section */}
        <div className="stats-section">
          <h2>Monthly Sales Statistics</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <ul>
              <li><strong>Sales Made:</strong> {salesData ? salesData.salesMade : 0}</li>
              <li><strong>Total Revenue:</strong> ${salesData ? salesData.totalRevenue : 0}</li>
              <li><strong>Items Sold:</strong> {salesData ? salesData.itemsSold : 0}</li>
            </ul>
          )}

          {/* Chart for sales performance */}
          <div className="chart-section">
            <h3>Sales Performance</h3>
            <Line data={data} />
          </div>
        </div>

        {/* Management Options Section */}
        <div className="management-options">
          <h2>Management Options</h2>
          <ul>
            <li>
              <Link to="/admin/inventory" className="management-option">
                <FaBoxOpen />
                <span className="option-title">Inventory Management</span>
              </Link>
              <ul className="sub-options">
                <li>Update Stock</li>
                <li>View Inventory</li>
                <li>Low Stock Alerts</li>
              </ul>
            </li>

            <li>
              <Link to="/admin/report" className="management-option">
                <FaFileAlt />
                <span className="option-title">Report Generation</span>
              </Link>
              <ul className="sub-options">
                <li>Generate Sales Report</li>
                <li>Inventory Report</li>
                <li>Customer Activity</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;

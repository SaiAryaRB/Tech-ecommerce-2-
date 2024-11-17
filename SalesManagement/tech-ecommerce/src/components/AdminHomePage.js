import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './admin.css';
import { Line } from 'react-chartjs-2';
import { FaBoxOpen, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'; // Import SignOut icon
import axios from 'axios'; // Import Axios
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Lottie from 'react-lottie';
import inventoryanimation from '../assets/Inventory Management Animation.json';
import reportAnimation from '../assets/Report Generation Animation.json';

// Register necessary components for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminHomePage = () => {
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);
  const adminName = "Admin"; // You can update this with dynamic values later when backend is ready
  const navigate = useNavigate(); // Use navigate for redirecting

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
        label: 'Daily Sales (RS.)',
        data: salesData ? salesData.dailySales.map(sale => sale.totalSales) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('role'); // Remove session storage item
    navigate('/login'); // Navigate to login page
  };

  // Animation options for Inventory Management
  const inventoryOptions = {
    loop: true,
    autoplay: true,
    animationData: inventoryanimation,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  // Animation options for Report Generation
  const reportOptions = {
    loop: true,
    autoplay: true,
    animationData: reportAnimation,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <div className="admin-dashboard">
      {/* Logout button */}
      <div className="logout-button">
        <button onClick={handleLogout}>
        <FaSignOutAlt />
          Logout
          </button>
      </div>

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
              <li><strong>Total Revenue:</strong> RS  {salesData ? salesData.totalRevenue : 0}</li>
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
        <div className="manoptions">
          <h2>Management Options</h2>
          <ul>
            <li>
              <Link to="/admin/inventory" className="management-option">
                {/* Lottie Animation for Inventory Management */}
                <Lottie options={inventoryOptions} height={200} width={200} />
                <FaBoxOpen />
                <span className="option-title">Inventory Management</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/report" className="management-option">
                {/* Lottie Animation for Report Generation */}
                <Lottie options={reportOptions} height={200} width={200} />
                <FaFileAlt />
                <span className="option-title">Report Generation</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;

import React, { useState } from 'react';
import './ReportGeneration.css';  // Include your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';  // Use Bootstrap for styling
import { Table } from 'react-bootstrap';

const ReportGeneration = () => {
  const [reportData, setReportData] = useState([]);
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateReport = async (type) => {
    setReportType(type);
    try {
      const response = await fetch(`http://localhost:3000/api/reports/${type}?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const exportToCSV = () => {
    // Implement CSV export functionality
  };

  const exportToPDF = () => {
    // Implement PDF export functionality
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Admin Report Generation</h1>

      <div className="d-flex justify-content-center my-4">
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mx-2"
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mx-2"
        />
        <button className="btn btn-secondary mx-2" onClick={() => generateReport(reportType)}>
          Apply Filters
        </button>
      </div>

      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-primary mx-2" onClick={() => generateReport('customer')}>
          Generate Customer Report
        </button>
        <button className="btn btn-primary mx-2" onClick={() => generateReport('item')}>
          Generate Item Report
        </button>
        <button className="btn btn-primary mx-2" onClick={() => generateReport('category')}>
          Generate Category Report
        </button>
        <button className="btn btn-primary mx-2" onClick={() => generateReport('sales')}>
          Generate Sales Report
        </button>
        <button className="btn btn-primary mx-2" onClick={() => generateReport('topCustomers')}>
          Generate Top Customers Report
        </button>
      </div>

      <div className="report-output">
        {reportData.length > 0 ? (
          <div className="report-table">
            <h3 className="text-center">Report Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {Object.keys(reportData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="text-center">No report data available. Please generate a report.</p>
        )}
      </div>

      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-success mx-2" onClick={exportToCSV}>
          Export to CSV
        </button>
        <button className="btn btn-danger mx-2" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ReportGeneration;

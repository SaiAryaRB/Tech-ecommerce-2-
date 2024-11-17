import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerDetails.css';

const CustomerDetails = () => {
    const [customerData, setCustomerData] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showSales, setShowSales] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [showReviews, setShowReviews] = useState(false);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            const customerId = sessionStorage.getItem('customerId');
            try {
                const response = await axios.post('http://localhost:3000/customer/customerdetails', { customerId });
                setCustomerData(response.data.customer);
                setSalesData(response.data.sales);
                setPhoneNumbers(response.data.phoneNumbers);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        fetchCustomerDetails();
    }, []);

    const toggleSales = () => setShowSales(!showSales);
    const handleSaleClick = (salesId) => setSelectedSale(selectedSale === salesId ? null : salesId);
    const toggleReviews = () => setShowReviews(!showReviews);

    // Group sales by SalesID and assign manual order numbers
    const groupedSalesData = salesData.reduce((acc, sale) => {
        const { SalesID, SalesAmount, SalesDate, Product_Name, Quantity, PaymentMethod } = sale;
        if (!acc[SalesID]) {
            acc[SalesID] = {
                SalesID,
                SalesAmount,
                SalesDate,
                items: []
            };
        }
        acc[SalesID].items.push({ Product_Name, Quantity, PaymentMethod });
        return acc;
    }, {});

    const groupedSalesArray = Object.values(groupedSalesData);

    // Add sequential order numbers starting from 1
    const salesWithManualOrder = groupedSalesArray.map((sale, index) => ({
        ...sale,
        Order: index + 1 // Sequential order number
    }));

    return (
        <div className="container">
            {customerData && (
                <div className="profile-card">
                    <div className="profile-header">
                        <h2>Customer Profile</h2>
                    </div>
                    <div className="customer-info">
                        <div>
                            <div className="info-group">
                                <div className="info-label">Name</div>
                                <div>{customerData.FirstName} {customerData.LastName}</div>
                            </div>
                            <div className="info-group">
                                <div className="info-label">Email</div>
                                <div>{customerData.Email}</div>
                            </div>
                            <div className="info-group">
                                <div className="info-label">Address</div>
                                <div>
                                    {customerData.House_Number}, {customerData.Street_Name},
                                    <br />
                                    {customerData.City}, {customerData.Pincode}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="info-group">
                                <div className="info-label">Contact Numbers</div>
                                <ul className="phone-list">
                                    {phoneNumbers.map((phone, index) => (
                                        <li key={index}>{phone.Phone_Number}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid-container">
                <div className="section-card">
                    <div className="section-header">
                        <h3>Purchase History</h3>
                        <button className="toggle-button" onClick={toggleSales}>
                            {showSales ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {showSales && (
                        <div className="section-content">
                            {salesWithManualOrder.length > 0 ? (
                                salesWithManualOrder.map((sale) => (
                                    <div 
                                        key={sale.SalesID}
                                        className="sale-item"
                                        onClick={() => handleSaleClick(sale.SalesID)}
                                    >
                                        <div className="sale-header">
                                            <span className="sale-id">Order #{sale.Order}</span> {/* Display manual order number */}
                                            <span className="sale-amount">₹{sale.SalesAmount}</span>
                                        </div>
                                        <div>{new Date(sale.SalesDate).toLocaleDateString()}</div>
                                        
                                        {selectedSale === sale.SalesID && (
                                            <div className="sale-details">
                                                 <div>Payment Method: {sale.items[0].PaymentMethod}</div>
                                                {sale.items.map((item, index) => (
                                                    <div key={index}>
                                                        <div>Product: {item.Product_Name}</div>
                                                        <div>Quantity: {item.Quantity}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No purchase history available</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="section-card">
                    <div className="section-header">
                        <h3>Customer Reviews</h3>
                        <button className="toggle-button" onClick={toggleReviews}>
                            {showReviews ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {showReviews && (
                        <div className="section-content">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="review-item">
                                        <div className="review-header">
                                            <span className="review-product">{review.Product_Name}</span>
                                            <span className="review-rating">★ {review.Rating}/5</span>
                                        </div>
                                        <div className="review-text">{review.ReviewText}</div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    const toggleSales = () => {
        setShowSales(!showSales);
    };

    const handleSaleClick = (salesId) => {
        setSelectedSale(selectedSale === salesId ? null : salesId);
    };

    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };

    return (
        <div>
            {customerData && (
                <div>
                    <h2>Customer Details</h2>
                    <p>Name: {customerData.FirstName} {customerData.LastName}</p>
                    <p>Email: {customerData.Email}</p>
                    <p>Address: {customerData.House_Number}, {customerData.Street_Name}, {customerData.City}, {customerData.Pincode}</p>

                    <h3>Phone Numbers</h3>
                    <ul>
                        {phoneNumbers.map((phone, index) => (
                            <li key={index}>{phone.Phone_Number}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={toggleSales}>Sales</button>
            {showSales && (
                <div>
                    <h3>Sales Details</h3>
                    {salesData.length > 0 ? (
                        salesData.map((sale) => (
                            <div key={sale.SalesID}>
                                <div onClick={() => handleSaleClick(sale.SalesID)}>
                                    <strong>Sales ID:</strong> {sale.SalesID} | <strong>Date:</strong> {new Date(sale.SalesDate).toLocaleDateString()} | <strong>Amount:</strong> {sale.SalesAmount} | <strong>Method:</strong> {sale.PaymentMethod}
                                </div>
                                {selectedSale === sale.SalesID && (
                                    <ul>
                                        <li><strong>Product Name:</strong> {sale.Product_Name} | <strong>Quantity:</strong> {sale.Quantity}</li>
                                    </ul>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No sales found.</p>
                    )}
                </div>
            )}

            <button onClick={toggleReviews}>Reviews</button>
            {showReviews && (
                <div>
                    <h3>Customer Reviews</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index}>
                                <p><strong>Product:</strong> {review.Product_Name}</p>
                                <p><strong>Rating:</strong> {review.Rating}</p>
                                <p><strong>Review:</strong> {review.ReviewText}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No reviews found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerDetails;

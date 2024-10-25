import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderConfirmation = () => {
    const [cartItems, setCartItems] = useState([]); // To store cart items
    const [totalPrice, setTotalPrice] = useState(0); // To store total price
    const [paymentMethod, setPaymentMethod] = useState('Cash'); // To store selected payment method
    const [orderConfirmed, setOrderConfirmed] = useState(false); // To track order confirmation status
    const [confirmationMessage, setConfirmationMessage] = useState('');

    // Fetch cart details function
    const fetchCartDetails = async () => {
        const customerId = sessionStorage.getItem('customerId'); // Retrieve customerId from sessionStorage
        if (!customerId) {
            console.error('No customer ID found');
            return;
        }

        try {
            // Make the API call to fetch cart details
            const response = await axios.post('http://localhost:3000/api/viewcart', { customerId });
            const items = response.data; // Expect the same format as in Cart.js
            console.log('Cart items fetched:', items); // Log the fetched items
            setCartItems(items); // Set the items in state
            
            // Calculate total price
            const total = items.reduce((sum, item) => sum + parseFloat(item.Total_Price), 0);
            setTotalPrice(total); // Set total price in state
        } catch (error) {
            console.error('Error fetching cart details:', error);
        }
    };

    // Fetch cart details when the component mounts
    useEffect(() => {
        fetchCartDetails();
    }, []); // Empty dependency array to run only once

    // Handle order confirmation
    const handleConfirmOrder = async () => {
        const customerId = sessionStorage.getItem('customerId'); // Retrieve customerId from sessionStorage

        if (!customerId) {
            console.error('No customer ID found for order confirmation');
            setConfirmationMessage('No customer ID found for order confirmation');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/order/confirm', {
                customerId,
                paymentMethod, // Send selected payment method
            });
            console.log('Order confirmation response:', response.data);

            // Ensure `confirmationMessage` is a string
            const message = response.data.message || 'Order confirmed successfully!';
            const salesId = response.data.salesId ? ` Sales ID: ${response.data.salesId}` : '';

            setOrderConfirmed(true);  // Update order confirmation status
            setConfirmationMessage(`${message}${salesId}`); // Update with a string message
        } catch (error) {
            console.error('Error confirming order:', error);
            setConfirmationMessage('An error occurred during order confirmation.');
        }
    };

    return (
        <div>
            <h1>Order Confirmation</h1>
            <h2>Review Your Order</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p> // Display a message if the cart is empty
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.Product_ID}> {/* Use Product_ID as the key */}
                            {item.Product_Name} - ${parseFloat(item.Price).toFixed(2)} x {item.Quantity} = ${parseFloat(item.Total_Price).toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2> {/* Display the total price */}

            <h3>Select Payment Method</h3>
            <div>
                <label>
                    <input
                        type="radio"
                        value="Cash"
                        checked={paymentMethod === 'Cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state
                    />
                    Cash
                </label>
                <label>
                    <input
                        type="radio"
                        value="Credit Card"
                        checked={paymentMethod === 'Credit Card'}
                        onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state
                    />
                    Credit Card
                </label>
                <label>
                    <input
                        type="radio"
                        value="Debit Card"
                        checked={paymentMethod === 'Debit Card'}
                        onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state
                    />
                    Debit Card
                </label>
                <label>
                    <input
                        type="radio"
                        value="PayPal"
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state
                    />
                    PayPal
                </label>
            </div>

            <button onClick={handleConfirmOrder}>Confirm Order</button>

            {orderConfirmed && <p>{confirmationMessage}</p>} {/* Display dynamic confirmation message */}
        </div>
    );
};

export default OrderConfirmation;

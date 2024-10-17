// src/components/OrderConfirmation.js
import React, { useState } from 'react';
import './OrderConfirmation.css'; // Add your styles here

const OrderConfirmation = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Sample order items (you can pass this as props if you prefer)
  const orderItems = [
    { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    { id: 3, name: 'Product 3', price: 19.99, quantity: 1 },
  ];

  const handleConfirmOrder = () => {
    if (paymentMethod) {
      // Trigger the popup
      setShowPopup(true);
    } else {
      alert('Please select a payment method.'); // Alert if no payment method is selected
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // Optionally, redirect to another page or reset the state here
  };

  // Calculate total price
  const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <h2>Review Your Order</h2>
      <ul>
        {orderItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

      <h2>Select Payment Method</h2>
      <div className="payment-methods">
        <label>
          <input 
            type="radio" 
            value="Credit Card" 
            checked={paymentMethod === 'Credit Card'} 
            onChange={() => setPaymentMethod('Credit Card')} 
          />
          Credit Card
        </label>
        <label>
          <input 
            type="radio" 
            value="PayPal" 
            checked={paymentMethod === 'PayPal'} 
            onChange={() => setPaymentMethod('PayPal')} 
          />
          PayPal
        </label>
        <label>
          <input 
            type="radio" 
            value="Cash on Delivery" 
            checked={paymentMethod === 'Cash on Delivery'} 
            onChange={() => setPaymentMethod('Cash on Delivery')} 
          />
          Cash on Delivery
        </label>
      </div>

      <button onClick={handleConfirmOrder}>Confirm Order</button>

      {/* Popup for Order Confirmation */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Order Placed!</h3>
            <p>Your order has been successfully placed.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
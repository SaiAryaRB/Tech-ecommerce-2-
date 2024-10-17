// src/components/Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  // Sample cart items
  const [cartItems] = useState([
    { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    { id: 3, name: 'Product 3', price: 19.99, quantity: 1 },
  ]);

  const handleProceedToOrder = () => {
    navigate('/order-confirmation'); // Redirect to the Order Confirmation page
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      <button onClick={handleProceedToOrder}>Proceed to Order Confirmation</button>
    </div>
  );
};

export default Cart;
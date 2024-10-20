// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart details when component mounts
  useEffect(() => {
    const fetchCartDetails = async () => {
      const customerId = sessionStorage.getItem('customerId'); // Retrieve customerId from sessionStorage
      if (!customerId) {
        // Handle case where customerId is not found
        console.error('No customer ID found');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/viewcart', { customerId }); // Call your backend API
        const items = response.data; // Assume the response data is the array of cart items
        setCartItems(items);
        
        // Calculate total price
        const total = items.reduce((sum, item) => sum + parseFloat(item.Total_Price), 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchCartDetails();
  }, []);

  const handleProceedToOrder = () => {
    navigate('/order-confirmation'); // Redirect to the Order Confirmation page
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.Product_Name} - ${parseFloat(item.Price).toFixed(2)} x {item.Quantity} = ${parseFloat(item.Total_Price).toFixed(2)}
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

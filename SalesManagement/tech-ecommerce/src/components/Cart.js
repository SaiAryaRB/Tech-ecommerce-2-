// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch cart details function
    const fetchCartDetails = async () => {
        const customerId = sessionStorage.getItem('customerId'); // Retrieve customerId from sessionStorage
        if (!customerId) {
            console.error('No customer ID found');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/viewcart', { customerId });
            const items = response.data; // Expect ProductID to be included
            console.log('Cart items fetched:', items); // Log the fetched items
            setCartItems(items);
            
            // Calculate total price
            const total = items.reduce((sum, item) => sum + parseFloat(item.Total_Price), 0);
            setTotalPrice(total);
        } catch (error) {
            console.error('Error fetching cart details:', error);
        }
    };

    // Fetch cart details when component mounts
    useEffect(() => {
        fetchCartDetails();
    }, []);

    const handleQuantityChange = async (productId, newQuantity) => {
        console.log('Updating quantity for Product ID:', productId, 'to:', newQuantity); // Log productId and newQuantity
        const customerId = sessionStorage.getItem('customerId');

        if (!customerId || newQuantity < 1) return; // Prevent update if no customer ID or quantity is invalid

        try {
            const response = await axios.post('http://localhost:3000/api/updatecart', {
                customerId,
                productId,
                newQuantity,
            });
            console.log(response.data.message);
            // Refresh cart details after updating quantity
            await fetchCartDetails();
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const handleDeleteItem = async (productId) => {
        console.log('Deleting item with Product ID:', productId); // Log productId
        const customerId = sessionStorage.getItem('customerId');

        if (!customerId) return;

        try {
            const response = await axios.post('http://localhost:3000/api/deletecart', {
                customerId,
                productId,
            });
            console.log(response.data.message);
            // Refresh cart details after deleting item
            await fetchCartDetails();
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

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
                    {cartItems.map((item) => {
                        // Detailed console logs for each item
                        console.log('Cart Item:', item); // Log the entire item
                        console.log('Product Name:', item.Product_Name);
                        console.log('Quantity:', item.Quantity);
                        console.log('Price:', item.Price);
                        console.log('Total Price:', item.Total_Price);
                        console.log('Product ID:', item.Product_ID); // Ensure this key exists

                        return (
                            <li key={item.Product_ID}> {/* Ensure ProductID is used as key */}
                                {item.Product_Name} - ${parseFloat(item.Price).toFixed(2)} x 
                                <input
                                    type="number"
                                    value={item.Quantity}
                                    min="1"
                                    style={{ width: '50px', marginLeft: '10px' }}
                                    onChange={(e) => handleQuantityChange(item.Product_ID, parseInt(e.target.value) || 1)} // Use ProductID here
                                />
                                = ${parseFloat(item.Total_Price).toFixed(2)}
                                <FaTrash
                                    onClick={() => handleDeleteItem(item.Product_ID)} // Ensure correct reference
                                    style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            <button onClick={handleProceedToOrder}>Proceed to Order Confirmation</button>
        </div>
    );
};

export default Cart;

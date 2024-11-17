// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './Cart.css'

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
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <ul className="cart-items">
                    {cartItems.map((item) => (
                        <li className="cart-item" key={item.Product_ID}>
                            <div className="item-details">
                                <span className="item-name">{item.Product_Name}</span>
                                <span className="item-price"> - ₹{parseFloat(item.Price).toFixed(2)}</span>
                                <div className="quantity-container">
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(item.Product_ID, item.Quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="quantity-input"
                                        value={item.Quantity}
                                        readOnly
                                    />
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(item.Product_ID, item.Quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="item-total"> = ₹{parseFloat(item.Total_Price).toFixed(2)}</span>
                            </div>
                            <FaTrash className="delete-icon" onClick={() => handleDeleteItem(item.Product_ID)} />
                        </li>
                    ))}
                </ul>
            )}
            <h2 className="total-price">Total Price: ₹{totalPrice.toFixed(2)}</h2>
            <button className="proceed-button" onClick={handleProceedToOrder}>
                Proceed to Order Confirmation
            </button>
        </div>
    );
};

export default Cart;

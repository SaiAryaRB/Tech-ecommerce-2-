import React, { useState, useEffect } from 'react';
import './InventoryManagement.css'; // Import your CSS file

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '' });
  const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', quantity: '' });

  // Fetch current inventory when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inventory'); // Adjusted API endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.quantity) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await fetch('http://localhost:3000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      fetchProducts(); // Refresh product list
      setNewProduct({ name: '', quantity: '' }); // Reset input fields
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateInventory = async () => {
    if (!updateProduct.id || !updateProduct.name || !updateProduct.quantity) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await fetch(`http://localhost:3000/api/inventory/${updateProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProduct),
      });
      fetchProducts(); // Refresh product list
      setUpdateProduct({ id: '', name: '', quantity: '' }); // Reset input fields
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="inventory-management">
      <h2>Inventory Management</h2>

      <div className="add-product">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="update-product">
        <h3>Update Inventory</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={updateProduct.id}
          onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="New Product Name"
          value={updateProduct.name}
          onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="New Quantity"
          value={updateProduct.quantity}
          onChange={(e) => setUpdateProduct({ ...updateProduct, quantity: e.target.value })}
        />
        <button onClick={handleUpdateInventory}>Update Product</button>
      </div>

      {/* Display current inventory */}
      <h3>Current Inventory</h3>
      <div>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.Inventory_ID} className="product">
              <h4>Product ID: {product.Product_ID}</h4>
              <p>Name: {product.Product_Name}</p>
              <p>Stock Level: {product.Stock_Level} in stock</p>
            </div>
          ))
        ) : (
          <p>No products available in inventory.</p>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;

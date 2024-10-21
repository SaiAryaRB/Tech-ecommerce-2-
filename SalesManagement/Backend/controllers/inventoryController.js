const db = require('../database'); // Adjust the path based on your project structure

const getInventory = (req, res) => {
    const query = `
      SELECT 
        Inventory.Inventory_ID, 
        Inventory.Product_ID, 
        Products.Product_Name, 
        Inventory.Stock_Level 
      FROM Inventory 
      JOIN Products ON Inventory.Product_ID = Products.Product_ID`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results); // This will now include Inventory_ID, Product_ID, Product_Name, and Stock_Level
    });
  };


// Add a new product to inventory
const addInventoryItem = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    await db.execute('INSERT INTO Inventory (Product_Name, Stock_Level) VALUES (?, ?)', [name, quantity]);
    res.status(201).json({ message: 'Product added to inventory successfully' });
  } catch (error) {
    console.error('Error adding product to inventory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing product in inventory
const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    await db.execute('UPDATE Inventory SET Product_Name = ?, Stock_Level = ? WHERE Inventory_ID = ?', [name, quantity, id]);
    res.json({ message: 'Product in inventory updated successfully' });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const salesRoutes = require('./routes/salesRoutes');
const productRoutes = require('./routes/productRoutes'); 
const reportRoutes = require('./routes/reportRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); 
const customerRoutes = require('./routes/customerRoutes');
const cartRoutes =require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const signupRoutes = require('./routes/signupRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from frontend's origin
}));

app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`); // Log each incoming request
  next(); // Proceed to the next middleware or route
});



// Use the auth routes
app.use('/auth', authRoutes);
app.use('/auth',signupRoutes);
// Use the sales routes for fetching sales data
app.use('/api', salesRoutes);  // Add this line to use the sales routes

app.use('/products', productRoutes);
// Use category routes
app.use('/api/categories', categoryRoutes);
app.use('/api', reportRoutes);
app.use('/customer',customerRoutes);

app.use('/api',cartRoutes);
// Use the inventory routes
app.use('/api/inventory', inventoryRoutes);
app.use('/order',orderRoutes);

app.use('/api',reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


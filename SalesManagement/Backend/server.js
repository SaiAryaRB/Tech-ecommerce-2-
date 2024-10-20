const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const salesRoutes = require('./routes/salesRoutes');
const productRoutes = require('./routes/productRoutes'); 
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from frontend's origin
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`); // Log each incoming request
  next(); // Proceed to the next middleware or route
});

// Use the auth routes
app.use('/auth', authRoutes);

// Use the sales routes for fetching sales data
app.use('/api', salesRoutes);  // Add this line to use the sales routes

app.use('/products', productRoutes);

app.use('/api', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


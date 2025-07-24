require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware - this allows our app to understand JSON requests
app.use(express.json());

// Routes - define the base path for our product API
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
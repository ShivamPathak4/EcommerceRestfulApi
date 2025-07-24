const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream'); // For converting buffer to stream for Cloudinary upload

// @desc    Get all products (or filter by category)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get 'category' from query parameters (e.g., ?category=Apparel)
    let query = {};
    if (category) {
      query.category = category; // Add category to query if provided
    }
    const products = await Product.find(query); // Find products matching the query
    res.json(products); // Send products as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID from URL parameter

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' }); // If no product, return 404
    }

    res.json(product); // Send product as JSON response
  } catch (err) {
    console.error(err.message);
    // Check if the error is due to an invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Public (for testing, usually restricted in real apps)
exports.createProduct = async (req, res) => {
  try {
    const { name, productInfo, price, category } = req.body; // Get data from request body

    // Basic Data Validation
    if (!name || !productInfo || !price || !category) {
      return res.status(400).json({ msg: 'Please enter all required fields: name, productInfo, price, category' });
    }
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ msg: 'Price must be a non-negative number' });
    }

    let imageUrl = null;
    if (req.file) { // If an image file was uploaded
        // Convert buffer to stream for Cloudinary upload
        const uploadStream = new Readable();
        uploadStream.push(req.file.buffer);
        uploadStream.push(null); // End the stream

        const result = await new Promise((resolve, reject) => {
            const cloudinaryStream = cloudinary.uploader.upload_stream(
                { folder: 'ecommerce_products', resource_type: 'auto' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            uploadStream.pipe(cloudinaryStream);
        });

        imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    // Create a new Product instance
    const newProduct = new Product({
      name,
      productInfo,
      price,
      category,
      imageUrl
    });

    const product = await newProduct.save(); // Save the new product to MongoDB
    res.status(201).json(product); // Send the created product with a 201 status (Created)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
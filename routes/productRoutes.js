const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload'); // Multer middleware for file uploads

// Define routes and link them to controller functions
// GET /api/products - Get all products or filter by category
router.get('/', productController.getProducts);

// GET /api/products/:id - Get a single product by ID
router.get('/:id', productController.getProductById);

// POST /api/products - Add a new product (with optional image upload)
// 'upload.single('image')' means Multer will look for a single file under the 'image' field name
router.post('/', upload.single('image'), productController.createProduct);

module.exports = router;
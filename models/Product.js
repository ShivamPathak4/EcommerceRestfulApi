const mongoose = require('mongoose');

// Define the schema (structure) for our Product documents
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Must have a name
    trim: true // Remove whitespace from ends
  },
  productInfo: {
    type: String,
    required: true // Must have product info
  },
  price: {
    type: Number,
    required: true, // Must have a price
    min: 0 // Price cannot be negative
  },
  imageUrl: {
    type: String,
    required: false // Image is optional for now
  },
  category: {
    type: String,
    required: true, // Must belong to a category
    enum: ['Apparel', 'Electronics', 'Books', 'Home Goods', 'Other'], // Allowed categories
    default: 'Other'
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set creation date
  }
});

module.exports = mongoose.model('Product', ProductSchema);
# E-commerce Product API Backend

This project implements a RESTful API for managing product data for an e-commerce platform. It provides endpoints for retrieving all products, fetching products by ID, filtering by category, and adding new products with image upload capabilities.

## 🚀 Tech Stack

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** NoSQL database used for storing product information.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying database interactions.
* **Cloudinary:** Cloud-based service for storing and managing product images.
* **Multer:** Node.js middleware for handling `multipart/form-data`, primarily used for file uploads.
* **Dotenv:** Module to load environment variables from a `.env` file.

## 📁 Project Structure

```

ecommerce-backend/
├── .env                  \# Environment variables (sensitive info)
├── package.json          \# Project dependencies and scripts
├── server.js             \# Main application entry point
├── config/
│   ├── db.js             \# MongoDB connection setup
│   └── cloudinary.js     \# Cloudinary configuration
├── models/
│   └── Product.js        \# Mongoose schema and model for products
├── routes/
│   └── productRoutes.js  \# API route definitions
├── controllers/
│   └── productController.js \# API logic/handlers for product operations
└── middleware/
└── upload.js         \# Multer configuration for file uploads

````

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js & npm:** Download from [nodejs.org](https://nodejs.org/en/download/).
* **MongoDB Atlas Account:** For a free cloud MongoDB database. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
* **Cloudinary Account:** For cloud image storage. Sign up at [cloudinary.com](https://cloudinary.com/).
* **Postman:** For easily testing API endpoints. Download from [postman.com/downloads](https://www.postman.com/downloads/).

## ⚙️ Setup and Installation

Follow these steps to get the project up and running locally:

1.  **Clone the Repository (or create project files):**
    ```bash
    git clone <repository_url> # If you have a Git repo
    cd ecommerce-backend
    ```
    If you're creating files manually, navigate to your project directory.

2.  **Install Dependencies:**
    Open your terminal in the `ecommerce-backend` directory and run:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root of your project (`ecommerce-backend/`) and add the following, replacing the placeholders with your actual credentials:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
    * **`MONGO_URI`**: Get this from your MongoDB Atlas cluster (Network Access must allow your IP).
    * **`CLOUDINARY_*`**: Find these on your Cloudinary dashboard.

4.  **Start the Server:**
    To start the server in development mode (with auto-restarts on file changes):
    ```bash
    npm run dev
    ```
    Or, for a standard run:
    ```bash
    npm start
    ```
    You should see messages like "MongoDB Connected..." and "Server running on port 5000" in your terminal.

## 🚀 API Endpoints & Postman Usage

The API is exposed at `http://localhost:5000/api/products`.
The base URL for all requests is `http://localhost:5000/api`.

A Postman collection with all the requests pre-configured is available. You can import it directly into Postman:

1.  Copy the raw JSON from the provided Postman Collection JSON (refer to previous response).
2.  In Postman, click `File` > `Import` > `Raw Text`.
3.  Paste the JSON and click `Import`.

Once imported, you can find the requests under the "E-commerce Product API" collection in Postman's sidebar.

---

### **1. Get All Products**

* **Method:** `GET`
* **URL:** `http://localhost:5000/api/products`
* **Postman:** Find the request named "Get All Products" in the collection. Just click "Send".

### **2. Get Products by Category**

* **Method:** `GET`
* **URL:** `http://localhost:5000/api/products?category=Apparel`
    * You can change `Apparel` in the URL's query parameter to `Electronics`, `Books`, `Home Goods`, or `Other` to filter by different categories.
* **Postman:** Find the request named "Get Products by Category (Apparel)" in the collection. Modify the `category` query parameter if needed, then click "Send".

### **3. Get Product by ID**

* **Method:** `GET`
* **URL:** `http://localhost:5000/api/products/YOUR_PRODUCT_ID`
    * **Important:** Replace `YOUR_PRODUCT_ID` in the URL with an actual product ID you obtain from a "Get All Products" request or after creating a new product.
* **Postman:** Find the request named "Get Product by ID" in the collection. Update the `id` path variable with a real product ID, then click "Send".

### **4. Create New Product (with Image Upload)**

* **Method:** `POST`
* **URL:** `http://localhost:5000/api/products`
* **Postman:** Find the request named "Create New Product (with Image Upload)" in the collection.
    * Go to the `Body` tab.
    * Ensure `form-data` is selected.
    * You will see fields like `name`, `productInfo`, `price`, `category`, and `image`.
    * For the `image` field, **you MUST manually select a file** from your computer. The placeholder path shown is just an example.
    * Fill in the required text fields and select your image, then click "Send".

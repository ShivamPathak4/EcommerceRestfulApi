const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from our .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    // If connection fails, log the error and exit the process
    console.error(err.message);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
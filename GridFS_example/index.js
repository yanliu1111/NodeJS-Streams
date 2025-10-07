const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); // Use GridFSBucket for file uploads
const connectDB = require('./db'); // Import the Mongoose connection setup
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 5050;

// Connect to MongoDB using Mongoose
connectDB();

// Serve the HTML file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Upload video to GridFS
app.get('/init-video', async function (req, res) {
  try {
    // Get the native MongoDB connection from Mongoose
    const db = mongoose.connection.db;

    // Create a GridFS bucket
    const bucket = new GridFSBucket(db);

    // Open a stream to upload the video
    const videoUploadStream = bucket.openUploadStream('bigbuck');
    const videoReadStream = fs.createReadStream('./bigbuck.mp4');

    videoReadStream.pipe(videoUploadStream)
      .on('error', (error) => {
        console.error('Error uploading video:', error);
        res.status(500).send('Error uploading video');
      })
      .on('finish', () => {
        res.status(200).send('Video uploaded successfully');
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { GridFSBucket } = require('mongodb'); 
const connectDB = require('./db'); 
require('dotenv').config(); 

const app = express();
const PORT = 5050;

// Connect to MongoDB using Mongoose
connectDB();

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
    const videoReadStream = fs.createReadStream('./file_example_MP4_480_1_5MG.mp4');

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

app.get("/mongo-video", (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);
    const downloadStream = bucket.openDownloadStreamByName('bigbuck');
    res.set('Content-Type', 'video/mp4');
    downloadStream.pipe(res).on('error', (error) => {
      console.error('Error streaming video:', error);
      res.status(500).send('Error streaming video');
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
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
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);

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

app.get("/mongo-video", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    // Check for the Range header
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const video = await db.collection('fs.files').findOne({ filename: 'bigbuck' });
    if (!video) {
      return res.status(404).send('Video not found');
    }
    const videoSize = video.length;
    const start = Number(range.replace(/\D/g, ''));
    const end = videoSize - 1;
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, headers);
    const bucket = new GridFSBucket(db);
    const downloadStream = bucket.openDownloadStreamByName('bigbuck', { start, end: end + 1 });
    // Pipe the video stream to the response
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
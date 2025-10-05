const {createReadStream, createWriteStream} = require('fs');
const readStream = createReadStream('./file_example_MP4_480_1_5MG.mp4');
const writeStream = createWriteStream('./copy.mp4', {
  // highWaterMark: 162802
});

readStream.on('data', (chunk) => {
  const result = writeStream.write(chunk);
  // which can tell the hole is full or not, If the hole is full, it will return pause pushing data
  if(!result) {
    console.log('backpressure');
    readStream.pause();
  }
})

readStream.on('error', (err) => {
  console.log("An err has occured");
  console.error(err);
})

readStream.on('end', () => {
  writeStream.end();
})

writeStream.on('drain', () => {
  console.log('drained');
  readStream.resume();
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n');
})
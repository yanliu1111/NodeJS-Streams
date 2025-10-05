const fs = require('fs'); //fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions. POSIX is a family of standards specified by the IEEE for maintaining compatibility between operating systems. POSIX defines the application programming interface (API), along with command line shells and utility interfaces, for software compatibility with variants of Unix and other operating systems.

const readStream = fs.createReadStream('./file_example_MP4_480_1_5MG.mp4');

readStream.on('data', (chunk) => {
  console.log("size:", chunk.length);
})

readStream.on('end', () => {
  console.log("read stream ended");
})

readStream.on('error', (err) => {
  console.log("an err has occured");
  console.error(err);
})

readStream.pause();
// made this into a non-flowing mode by pausing it, then typing 'finish' in the terminal to resume it
process.stdin.on('data', (chunk) => {
  if(chunk.toString().trim() === 'finish'){
    readStream.resume();
  }
  readStream.read();
})
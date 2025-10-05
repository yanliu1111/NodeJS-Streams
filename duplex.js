//Duplex: A stream that is both readable and writable.
//Example: Throttle in this code is a duplex stream. It reads data from its writable side and outputs it on its readable side.

const {Duplex, PassThrough} = require('stream');
const {createReadStream, createWriteStream} = require('fs');
const readStream = createReadStream('./file_example_MP4_480_1_5MG.mp4');
const writeStream = createWriteStream('./copy.mp4');
//Throttle is a custom Duplex stream that introduces a delay between chunks.
class Throttle extends Duplex {

  constructor(ms) {
    super();
    this.delay = ms;
  }
// no-op because the readable side is controlled by the writable side
  _read(){}
//_write(chunk, encoding, callback): Writes a chunk to the readable side and delays the operation using setTimeout.
  _write(chunk, encoding, callback) {
    this.push(chunk); // Push the chunk to the readable side
    setTimeout(callback, this.delay); ; // Introduce a delay before signaling the write is complete
  }

  _final(){
    this.push(null) // Signal the end of the readable side
  }
}

const report = new PassThrough();
const throttle = new Throttle(100); // 100ms delay

let total = 0;
report.on('data', (chunk) => {
  total += chunk.length;
  console.log('bytes: ', total);
})

readStream.pipe(throttle).pipe(report).pipe(writeStream);
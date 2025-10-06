//transform stream is changed data
const {Transform} = require('stream');

class ReplaceText extends Transform {
  constructor(char){
    super();
    this.replaceChar = char;
  }

  _transform(chunk, encoding, callback){
    const transformChunk = chunk.toString().replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);
    this.push(transformChunk);
    callback();
  }
//The _flush(callback) method is part of the Transform stream API in Node.js. It is called once at the end of the stream, after all chunks have been processed, to allow you to perform any final processing or cleanup before the stream ends.
  _flush(callback){
    this.push('more stuff us being passed through...')
    callback(); // Signal that the flush operation is complete
  }
}

const xStream = new ReplaceText('x');

process.stdin.pipe(xStream).pipe(process.stdout);

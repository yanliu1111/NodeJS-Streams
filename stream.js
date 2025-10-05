var fs = reqyure('fs');
var http = require('http');
var file = './file_example_MP4_480_1_5MG.mp4';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    fs.createReadStream(file)
    .pipe(res)
    .on('error',console.error);
}
).listen(3000, function() {
    console.log('Listening on port 3000');
});
//streaming, buffer, what is difference?
//buffer is a temporary storage area, stream is a continuous flow of data.
//streaming is piping the data to the browser, it continuously sends data to the browser. better than buffer code, because it doesnt have to wait for the entire file to be read before sending it to the browser. More scavenge garbage collection, less mark-sweep garbage collection.
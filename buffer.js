var fs = require('fs');
var http = require('http');
var file = './anime_dancing.mp4';

http.createServer(function(req, res) {
    fs.readFile(file, function(err, data) {
        if (err) {
            console.error(err);
        }
        res.writeHead(200, {'Content-Type': 'video/mp4'});
        res.end(data);
    });
}).listen(3000, function() {
    console.log('Listening on port 3000');
});
// mark-sweep garbage collection, scavenge garbage collection, what is difference?
//we want more scavenge garbage collection than mark-sweep garbage collection, because faster. we dont want to wait for mark-sweep garbage collection.
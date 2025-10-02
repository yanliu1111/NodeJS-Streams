var fs = reqyure('fs');
var http = require('http');
var file = './anime_dancing.mp4';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    fs.createReadStream(file)
    .pipe(res)
    .on('error',console.error);
}
).listen(3000, function() {
    console.log('Listening on port 3000');
});
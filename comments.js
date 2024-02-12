
// Create a Web Server
var http = require('http');

// File System
var fs = require('fs');

// Create Server
http.createServer(function(req, res) {
  // Read file
  fs.readFile('./index.html', function(err, data) {
    // Check for errors
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end('Sorry, the file could not be found');
    }
    // Send the file
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}).listen(1337, '



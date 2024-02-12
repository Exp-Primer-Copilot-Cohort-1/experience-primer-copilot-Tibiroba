// Create a web server
//
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
  // Parse the request containing file name
  var pathname = url.parse(req.url).pathname;

  if (pathname === '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else if (pathname === '/post') {
    var body = '';
    req.on('data', function(data) {
      body += data;
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function() {
      var post = qs.parse(body);
      comments.push(post.comment);
      res.writeHead(302, { 'Location': '/' });
      res.end();
    });
  } else if (pathname === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(comments));
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('404 Not found');
    res.end();
  }
});

server.listen(8080);
console.log('Server running at http://
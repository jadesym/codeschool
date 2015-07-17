var http = require('http');
// This pipes whatever data is sent via the request out back to the response
http.createServer(function(request, response) {
	response.writeHead(200);
	request.pipe(response);
}).listen(8080);

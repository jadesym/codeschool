var express = require('express');

// Creates application instance
var app = express();

app.get('/', function(request, response) {
	response.write('Hello world');
	response.end();
});

app.get('/blocks', function(request, response) {
	// var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	response.send(blocks);
});

app.get('/moved', function(request, response) {
	response.redirect(301, '/parts');
});

app.listen(3000, function () {
	console.log("Listening on port 3000");
});

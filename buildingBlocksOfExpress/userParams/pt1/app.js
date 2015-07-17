var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	if (request.query.limit >= 0) {
		response.json(blocks.slice(0, request.query.limit));
	} else {
		response.json(blocks);
	}
});

app.get('/blocks/:name', function(request, response) {
	var description = blocks[request.params.name];
	
	// May be undefined is block name is not found
	if (!description) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {
		response.json(description);
	}
});

// Below is the same as above
/*
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});
*/
app.listen(3000);

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var logger = require('./logger');
app.use(logger);

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

var locations = {
	'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
}

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
	response.json(Object.keys(blocks));
});

// Handlers are executed sequentially
// parseUrlencoded --> anonymous function
app.post('/blocks', parseUrlencoded, function(request, response) {
	var newBlock = request.body;
	blocks[newBlock.name] = newBlock.description;

	response.status(201).json(newBlock.name);
});

app.param('name', function(request, response, next) {
	var name = request.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	
	request.blockName = block;
	next();
});

app.get('/blocks/:name', function(request, response) {
	var description = blocks[request.blockName];
	
	// May be undefined is block name is not found
	if (!description) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {
		response.json(description);
	}
});

app.get('/locations/:name', function(request, response) {
	var location = locations[request.blockName];

	if (!location) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {
		response.json(location);
	}	
});

// Below is the same as above
/*
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});
*/
app.listen(3000);

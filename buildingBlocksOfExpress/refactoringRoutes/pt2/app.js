var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var locations = {
	'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
}

app.use(express.static('public'));

var blocks = require('./routes/blocks');
// var buildings = require('./routes/buildings');
// var users = require('./routes/users');

app.use('/blocks', blocks);
// app.use('/buildings', buildings);
// app.use('/users', users);

app.param('name', function(request, response, next) {
	var name = request.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	
	request.blockName = block;
	next();
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

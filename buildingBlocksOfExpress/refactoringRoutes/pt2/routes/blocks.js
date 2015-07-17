var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

// No blocks in the argument, the path argument 
// is relative to the path where it's mounted
router.route('/')
	.get(function(request, response) {
		response.json(Object.keys(blocks));
	})
	.post(parseUrlencoded, function(request, response) {
		// Handlers are executed sequentially
		// parseUrlencoded --> anonymous function
		var newBlock = request.body;
		blocks[newBlock.name] = newBlock.description;

		response.status(201).json(newBlock.name);
	});

router.route('/:name')
	.all(function (request, response, next) {
		var name = request.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		
		request.blockName = block;
		next();
	})
	.get(function(request, response) {
		var description = blocks[request.blockName];
	
		// May be undefined is block name is not found
		if (!description) {
			response.status(404).json('No description found for ' + request.params.name);
		} else {
			response.json(description);
		}
	})
	.delete(function(request, response) {
		delete blocks[request.blockName];
		response.sendStatus(200);
	});


module.exports = router;
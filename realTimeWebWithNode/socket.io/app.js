var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
	client.on('messages', function(data) {
		var nickname = client.nickname;
		console.log(data);
		client.broadcast.emit("messages", nickanem + ": " + data);i
		client.emit("messages", nickname + ": " + message);
	});
	client.on('join', function(name) {
		client.nickname = name;
	});
});

server.listen(8080);

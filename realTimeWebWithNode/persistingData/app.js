var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

var storeMessage = function(name, data) {
	messages.push({name: name, data: data});
	if (messages.length > 10) {
		messages.shift();
	}
}

io.on('connection', function(client) {
	client.on('messages', function(data) {
		client.get("nickname", function(error, name) {
			client.broadcast.emit("messages", name + ": " + message);
			client.emit("messages", name  + ": " + message);
			storeMessage(name, message);
		});
	});
	client.on('join', function(name) {
		messages.forEach(function(message) {
			client.emit("messages", message.name + ": " + message.data);
		});
		client.set('nickname', name);
		client.broadcast.emit("chat", name + " joined the chat");
	});
});

server.listen(8080);

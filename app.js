var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Blocks HTML characters (security equivalent to htmlentities in PHP)
    fs = require('fs');

// Loading the page index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, username) {
    // When the username is received it’s stored as a session variable and informs the other people
    socket.on('new_client', function(username) {
        username = ent.encode(username);
        socket.username = username;
        socket.broadcast.emit('new_client', username);
    });

var store = [];

    // When a message is received, the client’s username is retrieved and sent to the other people
    socket.on('message', function (data) {
        //message = ent.encode(message);
        var item = {};
        item.username = data.username;
        item.count = data.message;
        store.push(item); 
        
        socket.broadcast.emit('message', {username: data.username, message: parseInt(data.message) + 1});
    }); 
});

server.listen(8080);
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Blocks HTML characters (security equivalent to htmlentities in PHP)
    fs = require('fs');

// Loading the page index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var store = [];

io.sockets.on('connection', function(socket, username) {
    // When the username is received it’s stored as a session variable and informs the other people
    socket.on('new_client', function(username) {
        username = ent.encode(username);
        socket.username = username;
        socket.broadcast.emit('new_client', username);
    });

    // When a message is received, the client’s username is retrieved and sent to the other people
    socket.on('message', function(data) {
        //message = ent.encode(message);
        for (var i = 0, len = store.length; i < len; i++) {
            lookup[array[i].id] = array[i];
        }

        var item = $.grep(store, function(e) { return e.username == data.username; });
        if (item.length > 0) {
            item.count = parseInt(item.count) + 1;
        } else {
            var item = {};
            item.username = data.username;
            item.count = 1;
        }
        store.push(item);
        socket.broadcast.emit('message', { username: item.username, message: item.count });
    });
});

server.listen(8080);


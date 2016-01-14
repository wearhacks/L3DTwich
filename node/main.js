var net = require('net-socket'), 
    config = require('./config');


// var client = new net.Socket();

var socket = net.connect(config.port, config.host, function() {
    console.log("Connected");
    socket.write("Hello, love from client!");
});


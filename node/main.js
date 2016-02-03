require('events').EventEmitter.defaultMaxListeners = Infinity;

var net = require('net-socket'), 
    irc = require('tmi.js'),
    express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    config = require('./config');

/* Communications with Processing */
// Socket open with the local Processing server
var socket = net.connect(config.processing.server.port, config.processing.server.host, function() {
    console.log("Connected");
    socket.write("Hello, love from client!");
});


/* Communications with Twich */
// IRC client that will monitor the channel's IRC chat
var client = new irc.client(config.twich);
client.connect();

// Binding a response to new chat event: 
// if new message, parse it and send it to Processing
// (if it is valid)
client.on("chat", function(channel, user, message, self) {
    try {
        var data = parseMessage(message);
        console.log(data);
        socket.write(data);       
    } catch(e) {
        return;
    }
});


/* API */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.post('/', function(req, res) {
    var color = req.body.color,
        x = req.body.x, 
        y = req.body.y, 
        z = req.body.z;

    var data = [x, y, z].join(",") + ":" + color;

    try {
        console.log(data)
        socket.write(data);
        res.sendStatus(200);   
    } catch(e) {
        res,sendStatus(500);
    }

});

server.listen(config.node.server.port, function() {
    console.log('API running on port ' + config.node.server.port);
})




/* Helper functions */
function parseMessage(message) {
    var splitMessage, 
        cleanMessage = [],
        dataString = "";

    message = message.replace(/\s/g, '');

    var hex = ((message.indexOf("#") > -1) ? true : false);

    if (hex) {
        splitMessage = message.replace('(', '').split(")");
        splitMessage[1] = hexToRgb(splitMessage[1]);
        console.log(splitMessage);
    } else {
        message = message.replace(')(', '|').replace('(', '').replace(')', '');
        splitMessage = message.split("|");
    } 

    cleanMessage.push(splitMessage[0]);
     
    var tempList = [], 
        paddedList = [];

    tempList = splitMessage[1].split(',');
    tempList.forEach(function(value) {
        paddedList.push(padValue(value, "000"));
    });

    cleanMessage.push(paddedList.join(","));
   
    dataString = cleanMessage.join(':');

    return dataString;
}

function padValue(input, padding) {
    var str = "" + input,
        paddedValue = padding.substring(0, padding.length - str.length) + str;

    return paddedValue;
}


function hexToRgb(hex) {
/*
Source : stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*/
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(result)
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(',');
}
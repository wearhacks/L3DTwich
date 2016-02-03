require('events').EventEmitter.defaultMaxListeners = Infinity;

var net = require('net-socket'), 
    irc = require('tmi.js'),
    config = require('./config');

var client = new irc.client(config.twich);
client.connect();

var socket = net.connect(config.server.port, config.server.host, function() {
    console.log("Connected");
    socket.write("Hello, love from client!");
});

client.on("chat", function(channel, user, message, self) {
    try {
         var data = parseMessage(message);
        console.log(data);
        socket.write(data);       
    } catch(e) {
        return;
    }
});

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
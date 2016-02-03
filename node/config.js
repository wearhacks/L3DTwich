var config = {};

config.processing = {
    server : {
    port: 3001, 
    host: "localhost"
    }
};

config.node = {
    server : {
        port: 8080
    }
}

config.twich = {
    options: {
        debug: true
    },
    connection: {
        random: "chat",
        reconnect: true
    },
    identity: {
        username: "digitaljunkytwich",
        password: "oauth:3kjavt2tu0rihpcgwkactf0ab3ow9o"
    },
    channels: ["#digitaljunkytwich"]
};

module.exports = config;
var config = {};

config.server = {
    port: 3001, 
    host: "localhost"
};

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
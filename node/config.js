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
        username: "twitch_username",
        password: "oauth:your_twitch_oauth_key"
    },
    channels: ["#channel_name"]
};

module.exports = config;

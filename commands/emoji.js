var Discord = require('discord.js');

exports.run = (client, message, args) => { //Collecting info about command
        const emoji = client.emojis.get("569163103619514408");
        message.react(emoji);
};
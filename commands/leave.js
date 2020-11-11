const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {
  
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send({
    embed: {
      "description": "Você não tem permissão para usar este comando.",
      "color": 0xff2222,
      "title": "Erro"
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  if (!message.guild.me.voiceChannel) {
    return message.channel.send({
      embed: {
        "title": "Erro",
        "description": "O BOT já saiu.",
        "color": 0xff2222
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }
  message.guild.me.voiceChannel.leave();
  message.channel.send({
    embed: {
      "description": "**Saí de " + message.guild.me.voiceChannel.name + "**",
      "color": 0x22ff22
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

}
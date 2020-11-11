const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command
  if (message.author.id !== ops.ownerId && message.author.id !== '216308428828704769') return message.channel.send({
    embed: {
      "title": 'Nope',
      "color": 0xff2222
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  }); //If author of message isn't a bot owner, then warn him.
  if (args[0] != undefined) { // If isn't a null...

    try { //Trying to delete cache of the command
      delete require.cache[require.resolve(`./${args[0]}.js`)];
      message.channel.send({
        embed: {
          "color": 0x22ff22,
          "timestamp": new Date(),
          "footer": {
            "text": message + ""
          },
          "description": "O comando **``" + args[0] + "``** foi recarregado com sucesso",
          "title": "Recarregamento"
        }
      }).then(msg => {
        if (config[message.guild.id].delete == 'true') {
          msg.delete(config[message.guild.id].deleteTime);
        }
      });
    } catch (e) {
      return message.channel.send({
        embed: {
          "color": 0xff2222,
          "timestamp": new Date(),
          "footer": {
            "text": message + ""
          },
          "description": "O comando ``**" + args[0] + "**`` não existe!",
          "title": "Erro"
        }
      }).then(msg => {
        if (config[message.guild.id].delete == 'true') {
          msg.delete(config[message.guild.id].deleteTime);
        }
      });
    }
  } else {
    message.channel.send({
      embed: {
        "color": 0xff2222,
        "timestamp": new Date(),
        "footer": {
          "text": message + ""
        },
        "description": 'Você tem de precisar qual comando quer recarregar.',
        "title": "Erro"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }
}
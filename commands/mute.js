const Discord = require("discord.js");
const ms = require("ms");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

module.exports.run = async (client, message, args) => {
  
  let log = client.channels.get('566386000729866240') // Logging channel

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "Você não tem permissão para executar este comando.",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "Não foi possível encontrar esse usuário.",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "Você não tem permissão para mutar **essa pessoa**.",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  let muterole = message.guild.roles.find(`name`, "Mutado");

  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Mutado",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if (!mutetime) return message.channel.send({
    embed: {
      "title": "Você não especificou o tempo!",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  await (tomute.addRole(muterole.id));
  message.channel.send({
    embed: {
      "title": "Muted",
      "description": `<@${tomute.id}> foi mutado por ${ms(ms(mutetime))} por <@${message.author.id}>`,
      "color": 0x22ff22
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  setTimeout(function() {
    
    if (!tomute.roles.has(muterole.id)) return;
    
    tomute.removeRole(muterole.id);

    message.channel.send({
      embed: {
        "description": `<@${tomute.id}> foi desmutado!`,
        "color": 0x22ff22,
        "title": "Desmutado"
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }, ms(mutetime));

}
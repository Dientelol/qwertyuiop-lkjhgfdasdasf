const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  if (!args[0]) {
    const errEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor('Erro')
      .setTitle('Use: **' + conf[message.guild.id].prefix + '8ball (pergunta)**');
    message.channel.send({
      embed: errEmbed
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
    return;
  }

  var sayings = [
    "Sem dúvida",
    "Procura no Yahoo",
    "DEFINITAVENTE NÃO!",
    "Não sei",
    "Provávelmente",
    "Acho que sim",
    "Sim",
    "O meu pénis diz que sim",
    "Claro que sim",
    "Boa pergunta",
    "Hm... Acho que não gostarias de saber a resposta",
    "Acho que não",
    "Não",
    "Sei lá",
    "Claro que não",
    "O Google disse-me que não",
    "Não tenho a certeza",
  ];

  var result = Math.floor((Math.random() * sayings.length));
  const ballEmb = new Discord.RichEmbed()
    .setColor(0x00FFFF)
    .setAuthor('8ball', 'https://findicons.com/files/icons/1700/2d/512/8_ball.png')
    .addField(args, sayings[result]);
  message.channel.send({
    embed: ballEmb
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
}
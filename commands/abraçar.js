const Discord = require('discord.js');
const {
  get
} = require('request-promise-native');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  const options = {
    url: 'https://nekos.life//api/hug',
    json: true
  }

  get(options).then(body => {
    const hugEmb = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage(body.url);
    const sadEmb = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage('https://media.giphy.com/media/3oz8xLz5gnSla2STE4/giphy.gif');
    if (!args[0]) {
      message.channel.send(`<@${message.author.id}> abraçou <@${message.author.id}>.. Espera! Não podes te abraçar a ti mesmo!`, {
        embed: sadEmb
      });
      return;
    }

    if (message.mentions.users.first().id == 568199076278042634) {
      message.channel.send(`<@${message.author.id}> abraçou-me.. Oh, obrigado, m-mas eu sou só um bot... :cry:`, {
        embed: hugEmb
      });
      return;
    }

    if (!message.mentions.users.first()) return message.channel.send({
      embed: {
        "title": "Erro",
        "description": "Menciona uma pessoa que queiras abraçar!",
        "color": 0xFF2222
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
    message.channel.send(`<@${message.author.id}> abraçou ${args[0]}`, {
      embed: hugEmb
    });
  });

}
const Discord = require('discord.js');
const {
  get
} = require('request-promise-native');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  const options = {
    url: 'https://nekos.life//api/pat',
    json: true
  }

  get(options).then(body => {
    const patEmb = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage(body.url);
    const sadEmb = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage('https://media.giphy.com/media/ZFySXgeLyeUIE/giphy.gif');
    if (!args[0]) {
      message.channel.send(`O(A) <@${message.author.id}> acariciou <@${message.author.id}>.. Espera, não te podes acariciar a ti mesmo!`, {
        embed: sadEmb
      });
      return;
    }

    if (message.mentions.users.first().id == 568199076278042634) {
      message.channel.send(`O(A) <@${message.author.id}> acariciou-me... Oh, obrigado, m-mas eu sou apenas um bot... :cry:`, {
        embed: patEmb
      });
      return;
    }

    if (!message.mentions.users.first()) return message.channel.send({
      embed: {
        "description": "!",
        "color": 0xFF2222
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
    message.channel.send(`O(A) <@${message.author.id}> acariciou ${args[0]}`, {
      embed: patEmb
    });
  });

}
const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  var resp = 
    "**Utilisadores do BOT: **" + client.users.size + "\n" +
    "**Servidores onde o BOT está: **" + client.guilds.size + "\n" 
  
  var footer = 
    "Criado por MasterKiller#9370 e figados#0073"
  
  var embed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setDescription(resp)
    .setFooter(footer)
    .setTitle("Sobre o BOT - Clique para entrar na comunidade")
    .setURL("https://discord.gg/3CbnQjX")
  
  message.channel.send(embed);
  
}
const Discord = require('discord.js');
var utils = require('bot-utils');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args, ops) => {

  let BReasons = [
    "Motivo não definido"
  ];

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({
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

  let BMember = message.mentions.members.first();
  let BReason = args.slice(1).join(" ");
  if (!BReason) {
    BReason = BReasons[Math.floor(Math.random() * BReasons.length)];
  }
  if (!BMember) return message.reply("Você tem de mencionar a pessoa que quer kickar.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (BMember.id == 223533056852623360) return message.reply("Não.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (!BMember.kickable) return message.reply("Você não pode kickar moderadores.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  var embed = new Discord.RichEmbed()
    .setColor(0xFF2222)
    .setTitle("Kick")
    .setDescription(`🔨 O(A) ${BMember.user.tag} foi kickado(a) por \n**${BReason}**`);
  BMember.kick(BReason).catch(error => message.reply(`Да что за день то такой сегодня! Не смог забанить ${message.author}, хз почему, но может быть из-за: \n` + "```" + error + "```"));
  message.channel.send(embed);
  BMember.send(embed);
}
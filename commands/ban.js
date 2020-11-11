const Discord = require('discord.js');
var utils = require('bot-utils');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args, ops) => {

  let BReasons = [
    "Sem motivo definido"
  ];

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
    embed: {
      "description": "Você não tem permissão para banir utilizadores.",
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
  if (!BMember) return message.reply("Você tem de mencionar o usuário que queira banir.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (BMember.id == 223533056852623360) return message.reply("Não. Simplesmente não.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (!BMember.bannable) return message.reply("Você não pode banir essa pessoa!").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  var embed = new Discord.RichEmbed()
    .setColor(0xFF2222)
    .setTitle("B A N")
    .setDescription(`🔨 ${BMember.user.tag} foi banido por: \n**${BReason}**`);

  BMember.ban(BReason).catch(error => message.reply(`Fuck\n${message.author.username},\n` + "```" + error + "```"));
  message.channel.send(embed);
  BMember.send(embed)

}
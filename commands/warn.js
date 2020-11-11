var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const db = require("quick.db");
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  let reasons = [
    "Motivo de aviso não definido"
  ];

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "Você não tem permissão para usar esse comando.",
      "color": 0xff2222
    }
  });
  let warnedmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!warnedmember) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "Mencione a pessoa que deseja avisar",
      "color": 0xff2222
    }
  });
  let reason = args.slice(1).join(' ');
  if (!reason) reason = reasons[Math.floor(Math.random() * reasons.length)];

  const warned = new Discord.RichEmbed()
    .setColor(0xff5821)
    .setDescription(`Você foi avisado em ${message.guild.name} pelo ${message.author.username} por: *${reason}*.`)
    .setTitle("Avisado!")

  let author = message.author.username;

  const numberwarn = new db.table('WARNNUMBERs')
  const num1 = await numberwarn.fetch(`user_${warnedmember.id}_${message.guild.id}`)
  const y = 1
  var m = y + num1
  numberwarn.set(`user_${warnedmember.id}_${message.guild.id}`, m)

  const userwarn = new db.table('USERWARNINGs')
  var num2 = await numberwarn.fetch(`user_${warnedmember.id}_${message.guild.id}`)
  const warns = await userwarn.fetch(`warn_${warnedmember.id}_${num2}_${message.guild.id}_${author}`)
  userwarn.set(`warn_${warnedmember.id}_${num2}_${message.guild.name}_${author}`, reason)

  message.channel.send({
    embed: {
      "description": `***${warnedmember.user.tag} foi avisado!***\n**Motivo: **${reason}`,
      "title": "Avisado por " + message.author.username,
      "color": 0xff5821
    }
  });
  await warnedmember.send(warned);

}
const math = require('mathjs');
const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  if (!args[0]) return message.channel.send({
    embed: {
      "title": "Matemática",
      "description": "Insira Matemática, não posso esperar para resolver! :yum:\n\nPara matemática, use estes caractéres:\n\n`+` para adicionar\n`-` para subtrair\n`*` para multiplicar\n`/` para dividir",
      "color": 0xff0000
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  let resp;
  try {
    resp = math.eval(args.join(' '));
  } catch (e) {
    return message.channel.send({
      embed: {
        "title": "Erro",
        "description": "Um... Acho que não posso fazer isso...",
        "color": 0xff0000
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }


  const embed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle('Resultado:')
    .addField('Entrada', `\`\`\`js\n${args.join(' ')}\`\`\``)
    .addField('Saida', `\`\`\`js\n${resp}\`\`\``);

  message.channel.send(embed);

}
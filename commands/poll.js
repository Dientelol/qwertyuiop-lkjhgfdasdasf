const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  if (args.length == 0) {
    return message.channel.send({
      embed: {
        "title": "Ajuda (.poll)",
        "fields": [{
            "name": "Petição Simples (Sim/Não)",
            "value": "`poll` - este menu\n`poll <tempo> <pergunta>` - petição com tempo limitado. O tempo têm de ser inserido em segundos, por definição - 1 hora"
          },
          {
            "name": "Petição com escolha multipla",
            "value": "`mpoll <tempo> <pergunta> <r1>...<r9>` - petição com escolha multipla e tempo limitado. O tempo têm de ser inserido em segundos, por definição - 1 hora"
          }
        ],
        "color": 0xff0000,
        "footer": {
          "text": message + ""
        }
      }
    });
  }

  let time1 = args.shift();
  let question = args.join(" ");

  if (!isNaN(time1)) {
    time1 = time1 * 1000;
  } else {
    question = time1 + " " + question;
    time1 = 3600 * 1000;
  }

  message.channel.send({
    embed: {
      "title": "Petição:",
      "description": question + "",
      "color": 0xff0000,
      "footer": {
        "text": "Petição criada por " + message.author.username,
        "icon_url": message.author.avatarURL
      }
    }
  }).then(async function(msg) {
    await msg.react('👍');
    await msg.react('👎');

    var reactions = await msg.awaitReactions(reaction => reaction.emoji.name === '👍' || reaction.emoji.name === '👎', {
      time: time1
    });

    var yes = "Mais votado: 👍";
    var no = "Mais votado: 👎";
    var tie = "Empate!";
    var end;

    if (msg.reactions.get('👍').count - 1 > msg.reactions.get('👎').count - 1) {
      end = yes
    } else if (msg.reactions.get('👍').count - 1 < msg.reactions.get('👎').count - 1) {
      end = no
    } else if (msg.reactions.get('👍').count - 1 == msg.reactions.get('👎').count - 1) {
      end = tie
    }

    msg.channel.send({
      embed: {
        "title": question,
        "description": `**Fim da petição!** \n\n👍: ${msg.reactions.get('👍').count-1}\n***----------***\n👎: ${msg.reactions.get('👎').count-1}`,
        "color": 0xff0000,
        "footer": {
          "text": end
        }
      }
    })
  });

}
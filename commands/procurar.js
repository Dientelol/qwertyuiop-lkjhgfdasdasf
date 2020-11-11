var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const search = require('yt-search');
const Discord = require("discord.js");

exports.run = (client, message, args, ops) => { //Collecting info about command

  search(args.join(' '), function(err, res) {

    if (err) return message.channel.send({
      embed: {
        "title": "Erro",
        "description": "Use: `.procurar <música>`\nLembre-se que você tem de estar num canal de voz para executar o comando.",
        "color": 0xff2222
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });

    let videos = res.videos.slice(0, 10);
    let response = "";
    if (videos.length == 0) return message.channel.send({
      embed: {
        "title": "Erro",
        "description": "Não foi possível encontrar nenhuma música com esse nome.",
        "color": 0xff2222
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
    for (var i in videos) {
      response += `**${parseInt(i)+1}.** \`${videos[i].title}\`\n`;
    }

    var title = `*Escolha entre 1 e ${videos.length}*.`;

    const filter = m => !isNaN(m.content) && m.content <= videos.length && m.content > 0;
    const collector = message.channel.createMessageCollector(filter);
    
    message.channel.send({
      embed: {
        "description": response,
        "title": title,
        "color": 10616630
      }
    });

    collector.videos = videos;

    collector.once('collect', async function(m) {
      let commandFile = require('./play.js');
      await commandFile.run(client, message, [this.videos[parseInt(m.content) - 1].url], ops);
    });
  });
}
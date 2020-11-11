const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args) => {
  let replies = ["Um", "Dois", "Três", "Quatro", "Cinco", "Seis"];
  let result = Math.floor((Math.random() * replies.length));

  try {
    let newembed = new Discord.RichEmbed()
      .setAuthor("O dado foi lançado!")
      .setColor("#ff2222")
      .setDescription("\nResultado: " + replies[result])
      .setFooter("Dado lançado por " + message.author.tag, message.author.avatarURL);

    message.channel.send({
      embed: newembed
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  } catch (e) {
    console.log(e.stack);
  }; // The try is because it errored when I didn't do it.
};
var figlet = require('figlet');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  var maxLen = 14 // You can modify the max characters here

  if (args.join(' ').length > maxLen) return message.channel.send({
    embed: {
      "title": 'Erro',
      "color": 0xff0000,
      "description": "Você não pode criar um ASCII com mais de 14 caracteres."
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  if (!args[0]) return message.channel.send({
    embed: {
      "title": 'Erro',
      "description": 'Escreva uma palavra para aparecer em ASCII.',
      "color": 0xff0000
    }
  });

  figlet(`${args.join(' ')}`, function(err, data) {
    if (err) {
      console.dir(err);
      return;
    }

    message.channel.send(`${data}`, {
      code: 'AsciiArt'
    });
  });
}
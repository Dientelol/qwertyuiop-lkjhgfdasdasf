var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {
  

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("Não tem nada na fila! Use `play <url>|<música>` para adicionar uma música à fila.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send({
    embed: {
      "title": "Você têm de estar no mesmo canal de voz que eu!",
      "color": 0xff0000
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  var newQueue = fetched.dispatcher.queue.shift();
  ops.active.delete(fetched.dispatcher.queue);
  console.log(newQueue);

  message.channel.send({
    embed: {
      "description": "A fila está vazia!",
      "color": 0x22ff22
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

}
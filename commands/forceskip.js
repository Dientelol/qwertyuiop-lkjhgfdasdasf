var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command

  let fetched = ops.active.get(message.guild.id);
  
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send({
    embed: {
      "description": "Você não tem permissão para usar este comando!",
      "color": 0xff2222,
      "title": "Erro"
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  if (!fetched) return message.channel.send("Não está a tocar nada! Use `play <url>|<música>` para adicionar uma música à fila.").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send({
    embed: {
      "title": "Erro",
      "color": 0xff2222,
      "description": "Você tem de estar no mesmo canal de voz que eu.",
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  message.channel.send({
    embed: {
      "description": "Música pulada!",
      "color": 0xff0000,
      "title": "Sucesso!",
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (!fetched.queue.length == 0) {
    return fetched.dispatcher.emit('finish');
  } else {
    return fetched.dispatcher.end();
  }
  ops.active.set(message.guild.id, fetched);

}
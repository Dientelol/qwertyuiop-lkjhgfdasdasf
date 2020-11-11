var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command
  let fetched = ops.active.get(message.guild.id);
  
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send({
    embed: {
      "description": "Você não tem permissão para usar este comando.",
      "color": 0xff2222,
      "title": "Erro"
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

  if (!fetched) return message.channel.send("Não está nada a tocar! Use `play <url>|<música>` para adicionar uma música á fila.").then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "Você tem de estar no mesmo canal de voz que eu!",
      "color": 0xff2222
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

  if (!fetched.dispatcher.paused) return message.channel.send({
    embed: {
      "title": "Erro",
      "description": "A música não está em pausa.",
      "color": 0xff2222
    }
  });

  fetched.dispatcher.resume();

  message.channel.send({
    embed: {
      "title": "Retomado.",
      "color": 0x22ff22
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

}
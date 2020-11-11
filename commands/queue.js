    queueList = "\n\n**QaliFvar fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send({ embed: {"description": "A fila está vazia!"} });
  }

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let response = "Estou a tocar **" + nowPlaying.songTitle + "**\nSugerido por " + nowPlaying.requestAuthor.username;
  let queueList = "";
  if (queue.length == 1) {
  
    queueList = "\n\n**FilaueList = "";
  } else {
    queueList = "\n\n**Q:** \n";
  }

  for (let i = 1; i < queue.length; i++) {
    queueList += i + ". **" + queue[i].songTitle + "** - *" + queue[i].requestAuthor.username + "*\n";
  }

  message.channel.send({
    embed: {
      "description": response + queueList,
      "footer": {
        "text": message + ""
      },
      "color": 10288426
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[meteTime);
    }
  });

}
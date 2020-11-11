const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
var currencyFormatter = require('currency-formatter'); //For currency
var send = require("quick.hook");
var db = require("quick.db");

exports.run = async (client, message, args) => {

  const xp = new db.table("TOTAL_POINTS");
  const xpL = new db.table("POINTS");
  const level = new db.table("LEVELS");

  db.fetch(`userBalance_${message.author.id}`).then(b => {
    xp.fetch(`${message.guild.id}_${message.author.id}`, {
      "target": ".data"
    }).then(p => {
      level.fetch(`${message.guild.id}_${message.author.id}`, {
        "target": ".data"
      }).then(l => {
        xpL.fetch(`${message.guild.id}_${message.author.id}`, {
          "target": ".data"
        }).then(x => {

          if (p === null) {
            xp.set(`${message.guild.id}_${message.author.id}`, 0);
          }

          if (args.length == 0) {
            return message.channel.send({
              embed: {
                "color": 0xff0000,
                "title": "Converter XP em Moedas",
                "description": "Para converter use: `" + conf[message.guild.id].prefix + "converter <xp>`\n10 XP = 1 €"
              }
            });
          }

          if (isNaN(args[0])) {
            return message.channel.send({
              embed: {
                "color": 0xff2222,
                "title": "Erro",
                "description": "Insira quanto XP quer converter em dinheiro!\n**10 XP = 1 €**"
              }
            });
          }

          if (args[0] > x) {
            return message.channel.send({
              embed: {
                "color": 0xff2222,
                "title": "Erro",
                "description": "Você não tem esse XP todo!"
              }
            });
          }

          var amount = args[0] / 10;
          
          console.log(p + " - " + l + " - " + x);
          console.log(isNaN(p) + " - " + isNaN(l) + " - " + isNaN(x));

          xp.subtract(`${message.guild.id}_${message.author.id}`, args[0]);
          xpL.subtract(`${message.guild.id}_${message.author.id}`, args[0]);
          db.add(`userBalance_${message.author.id}`, args[0]/10);

          if (p < 0) {
            l.subtract(`${message.guild.id}_${message.author.id}`, 1);
          }

          message.channel.send({
            embed: {
              "color": 0x22ff22,
              "title": "Sucesso",
              "description": "Você converteu " + args[0] + " XP em " + args[0]/10 + "€!"
            }
          });

        });
      });
    });
  });

}
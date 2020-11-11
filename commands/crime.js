const Discord = require('discord.js'); //Discord lib
const db = require('quick.db'); //DB lib
var currencyFormatter = require('currency-formatter'); //For currency
var ms = require('parse-ms'); //MS lib
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args) => {

  try {
    let log = client.channels.get('471603875749691393') // Logging channel
    
    let cooldown = 5.4e+6; //1 hour in ms
    let cooldownpreso = 3.24e+12; //1 hour in ms
    
    let workplace = ["Hackear emails do Benfica", "Hack do Governo", "Roubo de Cartões de Crédito", "Scams", "Roubar a conta bancária dos seus pais"] // Places to work
    let acontecimento = ["Sim","Nao", "Sim", "Nao"]
    let quantia = [100, 200, 300, 350, 400, 450]
    let resultado = Math.floor((Math.random() * quantia.length)) 
    let amount = Math.floor((Math.random() * 100) + quantia[resultado]); // Ganho
    let dinheiropreso = Math.floor((Math.random() * 100) - quantia[resultado]); // Tirado
    
    let resultacontecimento = Math.floor((Math.random() * acontecimento.length)) 
    let crimeDaily = await db.fetch(`crimeDaily_${message.author.id}`) // Fetching the time when work is available.
    let result = Math.floor((Math.random() * workplace.length)) /* Random place */
    let timeObj = ms(cooldown - (Date.now() - crimeDaily)) // Left

    if(acontecimento[resultacontecimento] === "Sim"){
    try {

      db.fetch(`userBalance_${message.author.id}`).then(rm => { // Is balance valid
        if (rm == null || 0 || undefined) {
          db.set(`userBalance_${message.author.id}`, 50)
        } // Vipe if isn't a valid number
        
        else if (crimeDaily !== null && cooldown - (Date.now() - crimeDaily) > 0) { /* If already worked */

          let crimeDailyEmbed = new Discord.RichEmbed()
            .setAuthor(`Descanço`, message.author.displayAvatarURL)
            .setColor(0xff2222)
            .setDescription(`Você tentou fazer uma assalto a pouco tempo!\nVocê ainda precisa de descançar durante **${timeObj.hours} horas e ${timeObj.minutes} minutos**.`)

          message.channel.send(crimeDailyEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });

        } else if (`${result}` == "0") { /* First place */

          db.set(`crimeDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`userBalance_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`O(A) ${message.author.username} cometeu um crime!`, message.author.displayAvatarURL)
              .setColor(0x22ff22)
              .addField(`Você hackeou os emails do Benfica e enviou ao governo!`, `Você foi pago: ${currencyFormatter.format(amount, { code: '€' })}`)
              .setFooter("Crime: " + workplace[result]);

            message.channel.send(dailyEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });

          });

        } else if (`${result}` == "1") { /* Second place */

          db.set(`crimeDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`userBalance_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`O(A) ${message.author.username} cometeu um crime!`, message.author.displayAvatarURL)
              .setColor(0x22ff22)
              .addField(`Você hackeou o Governo dos EUA e encontrou provas de roubo aos Mexicanos.`, `Você divulgou aos jornalistas e foi pago: ${currencyFormatter.format(amount, { code: '€' })}`)
              .setFooter("Crime: " + workplace[result]);

            message.channel.send(dailyEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });
  
          });

        } else if (`${result}` == "2") { /* Third place */

          db.set(`crimeDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`userBalance_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`O(A) ${message.author.username} cometeu um crime!`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`Você hackeou uma XBOX e encontrou detalhes de um cartão de crédito!`, `Você retirou: ${currencyFormatter.format(amount, { code: '€' })}`)
              .setFooter("Crime: " + workplace[result]);

            message.channel.send(dailyEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });
            
          });

        } else if (`${result}` == "3") { /* Fourth place */

          db.set(`crimeDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`userBalance_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`O(A) ${message.author.username} cometeu um crime!`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`Você scammou um rapaz de 10 anos pelas suas skins de CS:GO!`, `E ganhou: ${currencyFormatter.format(amount, { code: '€' })}`)
              .setFooter("Crime: " + workplace[result]);

            message.channel.send(dailyEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });

          });

        } else if (`${result}` == "4") { /* Fifth place */

          db.set(`crimeDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`userBalance_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`O(A) ${message.author.username} cometeu um crime!`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`Você retirou ${currencyFormatter.format(amount, { code: '€' })} da conta bancária dos seus pais sem a autorização deles.`)
              .setFooter("Crime: " + workplace[result]);

            message.channel.send(dailyEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });

          });

        } else {
          message.channel.send({
            embed: {
              "title": "Erro",
              "color": 0xff2222
            }
          })
        }

      });
    } catch (err) {
      console.log("[ERRO] When working at " + result + "place\n" + err);
    }
      } else {
        if (crimeDaily !== null && cooldownpreso - (Date.now() - crimeDaily) > 0) { /* If already worked */
          let crimeDailyEmbed = new Discord.RichEmbed()
            .setAuthor(`Prisão`, message.author.displayAvatarURL)
            .setColor(0xff2222)
            .setDescription(`Você foi preso terá que esperar 1 dia!\nVocê ainda precisa de esperar **${timeObj.hours} horas e ${timeObj.minutes}** para voltar a essa vida.`)

          message.channel.send(crimeDailyEmbed);
          if (config[message.guild.id].delete == 'true') {
              message.delete(config[message.guild.id].deleteTime);
            }
        } else {
      db.set(`crimeDaily_${message.author.id}`, Date.now()); // Now time
      
      db.add(`userBalance_${message.author.id}`, dinheiropreso).then(i => {
      let perdidoEmbed = new Discord.RichEmbed()
              .setAuthor(`O(A) ${message.author.tag} foi preso!`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`Você acabou de ser preso!`, `Foi-lhe retirado: ${currencyFormatter.format(dinheiropreso, { code: '€' })} da sua conta`)
              .setFooter("Você foi preso por " + workplace[result]);

            message.channel.send(perdidoEmbed).then(msg => {
                  if (config[message.guild.id].delete == 'true') {
                      msg.delete(config[message.guild.id].deleteTime);
                  };
            });
        
      });
        };
    };
  } catch (err) {
    console.log("[ERROR] WORK: \n" + err);
  }
}
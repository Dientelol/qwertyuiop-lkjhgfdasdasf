var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
var Discord = require('discord.js');

exports.run = (client, message, args) => { //Collecting info about command
  var djonly = conf[message.guild.id].djonly; 
  var djroles = conf[message.guild.id].djroles;
  var djrolesNames = [];
  
  if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send({
    embed: {
      "description": "Você não tem permissão para usar esse comando.",
      "color": 0xff2222,
      "title": "Erro"
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  if (djroles.length == 0) {
    djrolesNames.push("Nenhum cargo");           
  } else {
    for (var i = 0; i < djroles.length; i++) {
      if (message.guild.roles.get(djroles[i]) == undefined) {} else {
        djrolesNames.push(message.guild.roles.get(djroles[i]).name);
      }
    }
  }

  var djSettings = new Discord.RichEmbed()
    .setDescription("***Definições DJ***")
    .addField("Apenas DJ", djonly)
    .addField("Cargos DJ", djrolesNames)
    .setColor(0xBBBBBB);

  var djAddError = new Discord.RichEmbed()
    .setDescription("**Especifique um cargo.**")
    .setTitle("Erro")
    .setColor(0xFF2222);

  var djAddAlreadyError = new Discord.RichEmbed()
    .setDescription("**Este cargo já é considerado DJ.**")
    .setTitle("Erro")
    .setColor(0xFF2222);
  
  var djRemoveAlreadyError = new Discord.RichEmbed()
    .setDescription("**Este cargo não é considerado DJ**")
    .setTitle("Erro")
    .setColor(0xFF2222);

  if (args.length == 0) {
    return message.channel.send(djSettings).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }

  switch (args[0]) {
    case "add":
      
      if (!args[1]) return message.channel.send(djAddError).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      }); //If no role
      
      var roleNameDJ = args.slice(1).join(' '); //Role Name
      var roleDJ = message.guild.roles.find('name', roleNameDJ); //Role Search
      if (roleDJ == null) roleDJ = message.mentions.roles.first();
      if (roleDJ == null) return message.channel.send({ embed: {"title": "Can't find a role.", "color": 0xff2222} });

      if (djroles.includes(roleDJ.id)) return message.channel.send(djAddAlreadyError).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      }); 

      djroles.push(roleDJ.id);
      //Then change the configuration in memory
      conf[message.guild.id].djroles = djroles;
      //and save the file.
      fs.writeFile("./config.json", JSON.stringify(conf, null, 2), (err) => {
        if (err) return console.log(err)
      });
      
      var successOutput = "";
      for (var i in djroles) {
        successOutput += message.guild.roles.get(djroles[i]).name + "\n"
      }
      
      var djAddSuccess = new Discord.RichEmbed()
        .addField(successOutput)
        .setTitle("Sucesso!")
        .setColor(0xFFFF22)
        .setDescription("Cargo Adicionado! Agora, \`djRoles\` inclui");
      
      message.channel.send(djAddSuccess).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });
      
      break;
    case "remove":
      
      if (!args[1]) return message.channel.send(djAddError).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      }); //If no role
      
      var roleNameDJ = args.slice(1).join(' '); //Role Name
      var roleDJ = message.guild.roles.find('name', roleNameDJ); //Role Search
      if (roleDJ == null) roleDJ = message.mentions.roles.first();
      if (roleDJ == null) return message.channel.send({ embed: {"title": "Não foi possível encontrar um cargo.", "color": 0xff2222} });

      if (!djroles.includes(roleDJ.id)) return message.channel.send(djRemoveAlreadyError).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      }); 

      djroles.slice(djroles.indexOf(roleDJ.id), 1);
      //Then change the configuration in memory
      conf[message.guild.id].djroles = djroles;
      //and save the file.
      fs.writeFile("./config.json", JSON.stringify(conf, null, 2), (err) => {
        if (err) return console.log(err)
      });
      
      var successOutput = "";
      
      if (djroles.length == 0) {
        successOutput = "No roles";
        conf[message.guild.id].djonly = false;
        fs.writeFile("./config.json", JSON.stringify(conf, null, 2), (err) => {
          if (err) return console.log(err)
        });
      } else {
        for (var i in djroles) {
          successOutput += message.guild.roles.get(djroles[i]).name + "\n"
        }
      }
      
      var djRemoveSuccess = new Discord.RichEmbed()
        .addField(successOutput)
        .setTitle("Sucesso!")
        .setColor(0xFFFF22)
        .setDescription("Cargo removido! Agora \`djRoles\` inclui");
        
      
      message.channel.send(djRemoveSuccess).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });
      
      break;
    case "djonly":
      
      if (args[1] == "1" || args[1] == "true" || args[1] == "yes") {
        
        if (djroles.length == 0) {
          return message.channel.send({
            embed: {
              "title": "Erro",
              "description": "Você não pode mudar esta configuração até adicionar um cargo DJ.",
              "color": 0xff2222
            }
          });
        }
        
        conf[message.guild.id].djonly = true;
        fs.writeFile("./config.json", JSON.stringify(conf, null, 2), (err) => {
          if (err) return console.log(err)
        });
        
        message.channel.send({
          embed: {
            "title": "Sucesso!",
            "description": "A definição `djOnly` foi mudada para **true**",
            "color": 0x22ff22
          }
        }).then(msg => {
          if (conf[message.guild.id].delete == 'true') {
            msg.delete(conf[message.guild.id].deleteTime);
          }
        });
        
      } else if (args[1] == "0" || args[1] == "false" || args[1] == "no") {
        conf[message.guild.id].djonly = false;
        fs.writeFile("./config.json", JSON.stringify(conf, null, 2), (err) => {
          if (err) return console.log(err)
        });
        
        message.channel.send({
          embed: {
            "title": "Sucesso",
            "description": "A definição `djOnly` foi mudada para **false**",
            "color": 0x22ff22
          }
        }).then(msg => {
          if (conf[message.guild.id].delete == 'true') {
            msg.delete(conf[message.guild.id].deleteTime);
          }
        });
        
      } else {
        message.channel.send({
          embed: {
            "title": "Erro",
            "description": "Insert Value",
            "color": 0xff2222
          }
        }).then(msg => {
          if (conf[message.guild.id].delete == 'true') {
            msg.delete(conf[message.guild.id].deleteTime);
          }
        });
      }
      
      break;
  }

}
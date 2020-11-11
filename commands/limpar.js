const Discord = require("discord.js");

module.exports.run = async (bot, message, args, messages) => {

  const deleteCount = parseInt(args[0], 10);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para executar esse comando.");
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Insira um número entre 2 e 100 de mensagens que quer eliminar.");
   
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(```diff\n- Não foi possível eliminar as mensagens: ${error}\n```));
  
  let purgeEmbed = new Discord.RichEmbed()
    .setAuthor("♻️ Limpar")
    .setColor("#22ff22")
    .addField("", `<@${message.author.id}>`)
    .addField("Limpar", `${args[0]}`)
    .addField("Deletadas", `${args[0]}`)
    .setFooter("Bot Versão 0.0.2", bot.user.displayAvatarURL);

    let purgeChannel = message.guild.channels.find(`name`, "log");
    if(!purgeChannel) return message.channel.send("Não foi possível encontrar o canal de Logs.");

    purgeChannel.send(purgeEmbed);

  }
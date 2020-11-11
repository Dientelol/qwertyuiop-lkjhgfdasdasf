const db = require('quick.db');
const Discord = require('discord.js');
var ms = require('parse-ms'); //MS lib

exports.run = async (client, message, args) => {

    let cooldown = 8.64e+7, //
    amount = 250
    
    let lastDaily = await db.fetch(`lastDaily_${message.author.id}`)
    
    try {
    db.fetch(`userBalance_${message.member.id}`).then(bucks => {
    if(bucks == null){
        db.set(`userBalance_${message.member.id}`, 50)}

    else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      
        let timeObj = ms(cooldown - (Date.now() - lastDaily))

        let lastDailyEmbed = new Discord.RichEmbed()
        .setAuthor(`Próximo Diario`)
        .setColor('#ffffff')
        .setDescription(`Você precisa esperar **${timeObj.hours} horas e ${timeObj.minutes} minutos**.`)
        .setFooter('Pedido por ' + message.author.tag, message.author.avatarURL)
        message.channel.send(lastDailyEmbed)
    } else {
        db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.member.id}`, amount).then(i => {
          var discord = require('discord.js')
          var embed = new Discord.RichEmbed()
          .setTitle('Diário')
          .setDescription(`Você coletou $${amount}€`)
          .setColor('#ffffff')
          .setFooter('Pedido por ' + message.author.tag, message.author.avatarURL)
          message.channel.send(embed);
        })}
    })} catch(err) {console.log(err)}

}
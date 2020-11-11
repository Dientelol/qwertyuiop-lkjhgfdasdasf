const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

var user = message.mentions.users.first() || message.author;
        
        var balance = await db.fetch(`userBalance_${user.id}`)
        
        if (balance === null) balance = 50;
        
        var embed = new Discord.RichEmbed()
        .setTitle('Dinheiro')
        .setDescription(`**${user.username}, você tem:**\n:yen: ${balance}€`)
        .setColor('#ffffff')
        .setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
        message.channel.send(embed)

}
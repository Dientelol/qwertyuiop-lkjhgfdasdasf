const Discord = require('discord.js');
const moment = require('moment');

const cooldown = new Set();
exports.run = async(client, message, ops) => {
    let args = message.content.split(' ').slice(1).join(' ');
    message.delete();
    if (cooldown.has(message.author.id && message.guild.id)) {
        return message.channel.send('**[ERRO]**' + message.author.tag + ', enviar tickets tem **5 minutos** de tempo de espera!');
    }
    if (args.length < 1) {
        return message.channel.send(`You must give me something to report first ${message.author}`);
    }
    cooldown.add(message.author.id && message.guild.id);
    setTimeout(() => {
        cooldown.delete(message.author.id && message.guild.id);
    }, 300000);
    let guild = message.guild;
    const cnl = client.channels.get('569204266150133796');
    message.author.send(`Olá, ${message.author}, nós recebemos o seu pedido de ajuda! Iremos responder o mais rápido possível!\nAqui está o seu pedido:`);
    const embed2 = new Discord.RichEmbed()
        .setAuthor(`Pedido de ajuda de ${message.author.tag}`, message.author.displayAvatarURL)
        .addField('**__Pedido de ajuda:__**', `👤 __**Autor do pedido:**__ ${message.author.tag}\n__⚒ **Servidor:**__ ${guild.name}\n📋 __**Pedido:**__ ${args}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter(`${moment().format('MMMM de YYYY, h:mm:ss a')}`)
        .setColor(16711728);
    message.author.send({ embed: embed2 });
    const embed = new Discord.RichEmbed()
        .setAuthor(`Pedido de ajuda de ${message.author.tag}`, message.author.displayAvatarURL)
        .addField('**__Pedido de ajuda:__**', `👤 **__Autor do pedido:__** ${message.author.tag}\n⚒ **__Servidor:__** ${guild.name}\n📋 **__Pedido:__** ${args}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor("#ffd700")
        .setFooter('Enviado às ' + moment().format('h:mm a'));
    cnl.send({ embed })
};
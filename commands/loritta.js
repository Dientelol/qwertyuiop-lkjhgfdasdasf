const Discord = require('discord.js');



module.exports = async function (client, message, hookArgs) {
  const send = require('quick.hook')
  
  send(message.channel, 'Current Settings...', {
    name: 'Settings',
    icon: 'https://i.imgur.com/X9eAmHm.png'
  });
}
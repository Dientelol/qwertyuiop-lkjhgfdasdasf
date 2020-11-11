exports.run = async (client, message, args) => {
  var user = message.mentions.members.first(); //User
  var roleName = args.splice(2).join(' ');
  var role = message.guild.roles.find('name', roleName); //Role Search
  var errors = [
    "```diff\n- Erro```"
  ];

  var userErr = [
    "Mencione um usuário."
  ];

  var roleErr = [
    "Especifique um cargo a dar à pessoa."
  ];

  var already = [
    "Esse usuário já tem o cargo."
  ];
  var alreadyNo = [
    "Esse usuário não tem esse cargo."
  ];

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Você não tem permissão para usar esse comando.")

  switch (args[0]) {
    case 'adicionar':
      if (!user) return message.reply(userErr[Math.floor((Math.random() * userErr.length))]); // I need User
      if (!roleName) return message.reply(roleErr[Math.floor((Math.random() * roleErr.length))]); //I need roleName
      if (role == null) role = message.mentions.roles.first();
      if (role == null) return message.reply("Não foi possível encontrar esse cargo.");
      if (user.roles.has(role.id)) return message.reply(already[Math.floor((Math.random() * already.length))]); //Already have role

      user.addRole(role).then(() => message.reply('Cargo dado com sucesso! :ok_hand:')).catch((err) => message.reply(errors[Math.floor((Math.random() * errors.length))]).then(() => console.log(err)));
      break;
    case 'remover':
      if (!user) return message.reply(userErr[Math.floor((Math.random() * userErr.length))]); // I need User
      if (!roleName) return message.reply(roleErr[Math.floor((Math.random() * roleErr.length))]); //I need roleName
      if (role == null) role = message.mentions.roles.first();
      if (role == null) return message.reply("Não foi possível encontrar esse cargo.");
      if (!user.roles.has(role.id)) return message.reply(alreadyNo[Math.floor((Math.random() * alreadyNo.length))]);

      user.removeRole(role).then(() => message.reply('O cargo foi removido do usuário mencionado. :ok_hand:')).catch((err) => message.reply(errors[Math.floor((Math.random() * errors.length))]).then(() => console.log(err)));
      break;
    default:
      message.channel.send({
        embed: {
          "description": 'O uso correto do comando é: \`.cargo <adicionar>|<remover> <usuário> <cargo>\`',
          "color": 0xff2222
        }
      });
  }
}
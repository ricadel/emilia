const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = {
    enabled: true,
    trigger: "github",
    callback: message => {
    const embed = new MessageEmbed()
      .setTitle('GitHub')
      .setThumbnail('https://i.imgur.com/QEx7fRP.jpg')
      .setDescription(oneLine`
        Нажми [сюда](https://github.com/ricadel/emilia) чтобы посетить мой Github репозиторий!
        Пожалуйста поддержи меня поставив ⭐ в репозитории, и не стесняйтесь комментировать проблемы и предложения!
      `)
      .addField('Другие ссылки',
        '**[Пригласи меня](https://discord.com/api/oauth2/authorize?client_id=777561893757517824&permissions=8&scope=bot) | ' +
        '[Поддержи сервер](https://discord.gg/g6AvGJvB5K)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
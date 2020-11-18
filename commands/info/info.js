const { MessageEmbed } = require('discord.js');
const pkg = require('../../package.json');
const { owner } = require('../../utils/emojis.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = {
  enabled: true,
  trigger: "botinfo",
  callback: message => {
    const tech = stripIndent`
      Version     :: ${pkg.version}
      Library     :: Discord.js v12.4.1
      Environment :: Node.js v12.16.3
    `;
    const embed = new MessageEmbed()
      .setTitle('Информация о Эмилии')
      .setThumbnail('https://i.imgur.com/QEx7fRP.jpg')
      .setDescription(oneLine`
      Emilia - это бот Discord с открытым исходным кодом, который постоянно растет. 
      Пока что она имеет мало функционала, но со временем он будет пополняться.
      Появилась на свет она **15 Ноября, 2020 года.**
      `)
      .addField('ID', `\`${message.client.user.id}\``, true)
      .addField(`Разработчик:`, `[vk.com/ricadel](https://vk.com/ricadel)`, '\u200b')
      .addField('Остальная информация', `\`\`\`asciidoc\n${tech}\`\`\``)
      .addField(
        'Ссылки', 
        '**[Пригласи меня](https://discord.com/api/oauth2/authorize?client_id=777561893757517824&permissions=8&scope=bot) | ' +
        '[Поддержи сервер](https://discord.gg/g6AvGJvB5K) | ' +
        '[Репозиторий](https://github.com/ricadel/emilia)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
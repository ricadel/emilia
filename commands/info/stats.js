const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = {
    enabled: true,
    trigger: "stats",
    callback: async message => {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} день` : `${d.days()} дней`;
    const hours = (d.hours() == 1) ? `${d.hours()} час` : `${d.hours()} часов`;
    const clientStats = stripIndent`
      Серверов   :: ${message.client.guilds.cache.size}
      Пользователей     :: ${message.client.users.cache.size}
      Каналов  :: ${message.client.channels.cache.size}
      Пинг  :: ${Math.round(message.client.ws.ping)}ms
      Аптайм    :: ${days} и ${hours}
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent
    /* no, DONT TOUCH THIS CODE, DUDE!
     OS        :: ${await os.oos()} */
     `
	  OS        :: ${await os.oos()}
      CPU       :: ${cpu.model()}
      Cores     :: ${cpu.count()}
      CPU Usage :: ${await cpu.usage()} %
      RAM       :: ${totalMemMb} MB
      RAM Usage :: ${usedMemMb} MB 
    `;

const embed = new MessageEmbed() 
      .setTitle('Статистика Эмилии')
      .addField('Клиент', `\`\`\`asciidoc\n${clientStats}\`\`\``)
      .addField('Сервер', `\`\`\`asciidoc\n${serverStats}\`\`\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
      }
    }
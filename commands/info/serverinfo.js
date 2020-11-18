const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {
    enabled: true,
    trigger: "serverinfo",
    callback: message => {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Информация о гильдии __${message.guild.name}__**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Основная', [
				`**❯ Имя:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Владелец:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**❯ Регион:** ${regions[message.guild.region]}`,
				`**❯ Уровень буста:** ${message.guild.premiumTier ? `Уровень ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Фильтр контента:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Уровень верификации:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Время создания:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Статистика', [
				`**❯ Количество ролей:** ${roles.length}`,
				`**❯ Количество эмодзи:** ${emojis.size}`,
				`**❯ Количетсво обычных эмодзи:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Количество анимированных эмодзи:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Количество участников:** ${message.guild.memberCount}`,
				`**❯ Людей:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Ботов:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Текстовых каналов:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Голосовых каналов:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Количество бустов:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Presence', [
				`**❯ Онлайн:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Отошёл:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Не беспокоить:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Оффлайн:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
            ])
            .addField(`**❯ Роли [${roles.length - 1}]**`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? roles.slice(0,10) : 'None')
			.setTimestamp();
		message.channel.send(embed);
	}

};
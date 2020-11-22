const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment= require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
    enabled: true,
	trigger: "userinfo",
	description: "Выводит информацию о пользователе.",
      dontShowInHelp: false,
      example: "userinfo",
    callback: (message, target) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.addField('Пользователь', [
				`**❯ Никнейм:** ${member.user.username}#${member.user.discriminator}`,
        // `**❯ Дискриминатор:** ${member.user.discriminator}`
				`**❯ ID:** ${member.id}`,
				`**❯ Флаги:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Аватар:** [Ссылка на аватар](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Дата регистрации:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**❯ Статус:** ${localeStatus(member.user.presence.status)}`,
				`${getGame(member)}`,
				`\u200b`
			])
			.addField('Участник', [
				`**❯ Высшая роль:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**❯ Когда вступил на сервер:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**❯ Роли [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? roles.slice(0,20) : 'None'}`,
				`\u200b`
			]);
		return message.channel.send(embed);
    }
}


function getActivity(member){
    if(member.user.presence.activities.length > 0) { return member.user.presence.activities[0].name; }
}


function getGame(member){
    let game = getActivity(member) || false;
    if(game == "Spotify"){
        let activity = member.user.presence.activities[0];
        return `**❯ Слушает в Spotify:** ${activity.state} - ${activity.details} \[[<:spotify:777666199642832937>]\](https://open.spotify.com/track/${activity.syncID})`;
    } else {
        return `**❯ Игра:** ${getActivity(member) || "Не играет"}`;
    }
}

function localeStatus(status){
    switch (status){
        case 'online':
            return 'В сети';
            break;
        case 'idle':
            return 'Отошёл';
            break;
        case 'offline':
            return 'Не в сети';
            break;
        case 'dnd':
            return 'Не беспокоить';
            break;
    }
}

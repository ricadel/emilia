/* module.exports = {
    enabled: true,
    trigger: "help",
    callback: message => {
        message.channel.send(`**Привет, <@${message.author.id}>!**\nтут пока что ничего нету, но ты можешь посмотреть на моё милое личико :heart:`);
    }
} */

const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "help",
    description: "Краткая справка по всем командам бота.",
    regexp: 'help(.*)',
    example: "help",
    dontShowInHelp: true,
    callback: (message, args, hear) => {
        const embed = new MessageEmbed()
            .setTitle("Emilia > Help")
            .setColor("PURPLE");
        let cache = hear.cache;
        let prefix = hear.getPrefixForGuild(message);
        args = args[1].split(" ");
        if (args.length == 1) {
            embed.setDescription(`Вы можете получить помощь по любой доступной команде, отправив **${prefix}help <команда>**`)
            for (const [cat, cmds] of Object.entries(hear.cache)) {
                let localmd = [];
                cmds.forEach(cmd => {
                    localmd.push('`' + cmd.name + '`');
                });
                if (localmd.length > 0) {
                    embed.addField(`> **${cat}**`, [
                        `${localmd.join(", ")}`
                    ], true);
                }
            }
        } else if (args.length == 2) {
            let cmd, category;
            for (const [cat, cmds] of Object.entries(hear.cache)) {
                cmds.forEach(e => {
                    if (e.name == args[1]) {
                        cmd = e;
                        category = cat;
                    }
                });
            }
            if (typeof cmd != "undefined") {
                embed.addField(`> **${cmd.name}**`, [
                    `**Описание:** ${cmd.description}`,
                    `**Применение:** ${prefix}${cmd.usage}`,
                    `**Категория:** ${category}`
                ]);
            } else {
                embed.addField(`> **${args[1]}**`, [
                    `Комамнда ${args[1]} не найдена.`
                ]);
            }
        }
        return message.channel.send(embed);
    }
}

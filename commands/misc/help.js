module.exports = {
    enabled: true,
    trigger: "help",
    callback: message => {
        message.channel.send(`**Привет, <@${message.author.id}>!**\nтут пока что ничего нету, но ты можешь посмотреть на моё милое личико :heart:`);
    }
}

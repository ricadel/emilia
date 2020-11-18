const Discord = require('discord.js');
module.exports = {
    enabled: true,
    trigger: "avatar",
    callback: message => {
        if(message.mentions.users.size){
            let member=message.mentions.users.first()
        if(member){
            const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL({dynamic: true, size: 512})).setTitle(member.username)
            message.channel.send(emb)

        }
        else{
            message.channel.send("Я не нашла такого пользователя, прости братик!")

        }
        }else{
            const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL({dynamic: true, size: 512})).setTitle(message.author.username)
            message.channel.send(emb)
        }
    }   
}
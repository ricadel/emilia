const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();


module.exports = {
    enabled: true,
      trigger: "yuri",
      description: "Отправляет рандомные безобидные Юри картинки.",
      dontShowInHelp: false,
      example: "yuri",
      callback: async message => {
    //command

  //Checks channel for nsfw
  var errMessage = "Это не NSFW канал!";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.yuri());

        const yuri = new Discord.MessageEmbed()
        .setTitle("Yuri")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(yuri);

}

      work();
}
         }
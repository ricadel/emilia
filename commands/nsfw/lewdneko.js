
const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    enabled: true,
      trigger: "lewdneko",
      callback: async message => {
    //command

  // Проверка канала на наличие NSFW
  var errMessage = "Это не NSFW канал!";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.neko());

        const lewdneko = new Discord.MessageEmbed()
        .setTitle("NSFW Neko")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(lewdneko);

}

      work();
}
                };
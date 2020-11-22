const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  enabled: true,
    trigger: "hentai",
      description: "Отправляет рандомные хентай картинки.",
      dontShowInHelp: false,
      example: "hentai",
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
        let owo = (await neko.nsfw.hentai());

        const hentai = new Discord.MessageEmbed()
        .setTitle("Hentai")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(hentai);

}

      work();
}
                };

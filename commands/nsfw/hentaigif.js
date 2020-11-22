const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    enabled: true,
      trigger: "hgif",
      description: "Отправляет рандомные хентай гифки.",
      dontShowInHelp: false,
      example: "hgif",
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
        let owo = (await neko.nsfw.randomHentaiGif());

        const hentaigif = new Discord.MessageEmbed()
        .setTitle("Hentai Gif")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(hentaigif);

}

      work();
}
                };
const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();


module.exports = {
    enabled: true,
    trigger: "ngif",
      description: "Отправляет рандомные неко гифки.",
      dontShowInHelp: false,
      example: "ngif",
    callback: async message => {
  //команда 
    //Checks channel for nsfw


async function work() {
    let owo = (await neko.sfw.nekoGif());

    const nekos = new Discord.MessageEmbed()
    .setTitle("neko")
    .setImage(owo.url)
    .setColor(`#FF0000`)
    .setURL(owo.url);
    message.channel.send(nekos);

}

  work();
}
            };
// Хуита созданная по приколу, why? a glavnoe nahuya?

module.exports = {
    enabled: true,
    trigger: "say",
    description: "Хуй.",
      dontShowInHelp: true,
      example: "say",
    callback: message => {
        message.channel.send(message.content.split(" ").slice(1).join(" "));
        message.delete().catch();
      }
    };

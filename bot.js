const HearManager = require("./modules/Misc/hear");
const Discord = require('discord.js');
let config = require('./config.json');
let token = config.token;
let prefix = config.prefix;
let ownerId = config.ownerId;

const hear = new HearManager();

const client = new Discord.Client();
client.once('ready', () => {
    console.log(`Now watching ${client.guilds.cache.size} servers`)
    console.log("Now " + hear.count() + " commands loaded");
    updatePresence();
    /* setInterval(function(){
        updatePresence();
    }, 60 * 1000 * 2);*/ 
});

client.on('message', message => {
    hear.hear(message);
});

function updatePresence() {
    console.log(`Update server info`);
      client.user.setPresence({
          status: 'online',
          activity: {
              type: 'PLAYING',
              // name: `${client.guilds.cache.size} ${getServerLocale(client.guilds.cache.size.toString())} | !help`
              name: `!help`
          }
      });
  };
/*
  function getServerLocale(count){
    if(count.endsWith("1")){
        return "сервер";
  }       if(count.endsWith("2") || count.endsWith("3") || count.endsWith("4")){
            return "сервера";
      }       else {
                return "серверов";
      }
  } */




client.login(token);

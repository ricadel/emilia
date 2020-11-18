const fs = require("fs");

module.exports = class HearManager {
    constructor() {
        this.commands = [];
        fs.readdirSync("./commands").map(e1 => {
            if(e1.endsWith(".js")){
                let cmd = require("../../commands/" + e1);
                if(cmd.enabled) this.commands.push(cmd);
            } else {
                const dirStat = fs.lstatSync("./commands/" + e1);
                if(dirStat.isDirectory()){
                    fs.readdirSync("./commands/" + e1).map(e2 => {
                        if(e2.endsWith(".js")){
                            let cmd = require("../../commands/" + e1 + "/" + e2);
                            if(cmd.enabled) this.commands.push(cmd);
                        }
                    });
                }
            }
        });
    }

    count(){
        return this.commands.length;
    }

    async hear(hear, msg, client){
        if(hear.startsWith("!")){
            let cmd = this.commands.find((e) => { if(hear.startsWith("!" + e.trigger)) return true; });
            if(typeof cmd != "undefined"){
                if(cmd.cooldown){
                    if(checkForCooldown(msg, cmd.trigger, cmd.cooldown)){
                        return msg.channel.send("Не так быстро!");
                    }
                }
                return cmd.callback(msg, client);
            }
        }
    }
}
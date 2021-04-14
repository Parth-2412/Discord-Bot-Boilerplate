import {  Message, Command} from "../types";
import * as Discord from "discord.js";

const command : Command= {
    name : "set-prefix",
    description : "Sets the prefix for the bot",
    argsNumber : 1,
    usage : "<prefix>",
    permissions : ["ADMINISTRATOR"],
    execute(message : Message, args : string[]){
        const prefix = args.shift() as string;
        message.client.prefixes.set((message.guild as Discord.Guild).id, prefix);
        message.reply(`Prefix set to ${prefix}`);
    }
} 

export default command;
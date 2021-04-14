import * as Discord from "discord.js";

const prefix = "!"; // default prefix

export interface Command {
    name : string;
    description : string;
    usage ?: string;
    execute : (message : Message, args : string[]) => any;
    argsNumber ?: number;
    guildOnly ?: boolean;
    permissions ?: Discord.PermissionString[];
}

export interface IClient extends Discord.Client{
    prefix : string;
    commands : Discord.Collection<string,Command>;
    prefixes : Discord.Collection<string,string>;
}

export interface Message extends Discord.Message {
    client : Client;
}


export class Client extends Discord.Client implements IClient{
    commands = new Discord.Collection<string,Command>(); // all commands of the bot
    prefixes = new Discord.Collection<string,string>(); // the prefixes of the commands of the bot in each server
    prefix = prefix;
    on_message = (listener : (message : Message) => any) => {
        this.on("message", listener  as (message : Discord.Message) => void);
    }
}
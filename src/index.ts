import * as Discord from "discord.js";
import * as fs from "fs";
import * as path from 'path';
import { Client, Message, Command } from "./types"


require("dotenv").config();

const token = process.env.TOKEN;

const client = new Client();

fs.readdirSync(path.join(__dirname, "./commands")).filter( file => file.endsWith(".ts")).forEach(
    file => {
        const command : Command = require(`./commands/${file}`).default;
        if(command.permissions) command.guildOnly = true; // if the command is protected by permissions then it can only be excuted in a server not in a DM
        client.commands.set(command.name , command);
    }
)

client.on("ready", () => {
    console.log("Ready");
})


client.on_message((message : Message) => {
    const guildId = message .guild?.id; 
    const prefixes = message.client.prefixes;

    if(guildId && !prefixes.has(guildId)){
        prefixes.set(guildId, message.client.prefix) ;
        message.client.prefixes= prefixes;
    } 
    const guildPrefix = guildId ? (prefixes.get(guildId) as string) : message.client.prefix; 
    if(!message.content.startsWith(guildPrefix) || message.author.id === message.client.user?.id) return;

    const args = message.content.slice(guildPrefix.length).trim().split(/ +/);

    const commandName = (args.shift() as string).toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;
    try {
        if(command.guildOnly && message.channel.type !== "text") return message.reply("You can only use this command in the text channels of a server");
        
        const permissions = command.permissions;
        if(permissions){
            const authorPerms = (message.channel as Discord.TextChannel).permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(permissions)) return message.reply('You do not have permission(s) to do this');
        }

        if(command.argsNumber && args.length < command.argsNumber) return message.reply(`You didn't provide all arguments\n Correct usage: \`${client.prefix}${command.name} ${command.usage}\``);
        command.execute(message, args);

    } 
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
})

client.login(token) // never put your token directly in the code. Put it in a .env file as specified in README.md
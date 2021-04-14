import {  Message, Command} from "../types";
import * as Discord from "discord.js";

const command : Command = {
    name : "help",
    description : "Lists all my commands or info about a specific command",
    usage : "[command name]",
    execute(message : Message, args : string[]){
        const commandName = args.shift();
        const embed = new Discord.MessageEmbed();
        const client = message.client
        const permissions = ((message.channel as any).permissionsFor && (message.channel as Discord.TextChannel).permissionsFor(message.author)) || new Discord.Permissions();
        if(commandName){
            const command = client.commands.get(commandName);
            if(!command) return message.reply("Command not found");

            if(command.guildOnly && message.channel.type !== "text") return message.reply("You can only view this command in the text channels of a server");
            if(command.permissions &&  !permissions.has(command.permissions)){
                let reply = "You do not have permission to view this command";
                return message.reply(reply);
            }  
            embed.addField("Name" , command.name );
            embed.addField("Description" , command.description);
            if(command.usage) embed.addField("Usage" , `${message.guild?.id ? client.prefixes.get(message.guild.id) : client.prefix}${command.name} ${command.usage}`);
            if(command.permissions) embed.addField("Permissions" , command.permissions.join("\n"));
        }
        else{
            embed.setTitle("Help");
            embed.setDescription("Shows a list of all my commands");
            const allCommandNames = client.commands.filter(command => command.guildOnly ? message.channel.type==="text" && permissions.has(command.permissions): true ).map(command => command.name);
            embed.addField("Commands" , allCommandNames.join("\n"));  
        }
        message.channel.send(embed);
    }
}

export default command;
const Discord = require("discord.js");

module.exports = {
    name : "help",
    description : "Lists all my commands or info about a specific command",
    usage : "[command name]",
    execute(message, args){
        const commandName = args.shift();
        const embed = new Discord.MessageEmbed();
        const permissions = message.channel.permissionsFor(message.author);
        if(commandName){
            if(!message.client.commands.has(commandName)) return message.reply("Command not found");
            const command = message.client.commands.get(commandName);
            if(command.permissions && (!permissions || !permissions.has(command.permissions))) return message.reply("You do not have permission to view this command");
            embed.addField("Name" , command.name );
            embed.addField("Description" , command.description);
            if(command.usage) embed.addField("Usage" , `${message.client.prefix}${command.name} ${command.usage}`);
            if(command.permissions) embed.addField("Permissions" , command.permissions.join("\n"));
        }
        else{
            embed.setTitle("Help")
            embed.setDescription("Shows a list of all my commands");
            const allCommandNames = message.client.commands.filter(command => permissions && permissions.has(command.permissions)).map(command => command.name);
            embed.addField("Commands" , allCommandNames.join("\n"));  
        }
        message.channel.send(embed)
    }
}
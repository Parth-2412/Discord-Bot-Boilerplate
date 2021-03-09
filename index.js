require("dotenv").config();

const token = process.env.TOKEN;

const Discord = require("discord.js")
const fs = require("fs");

const client = new Discord.Client();
const prefix = "!";

client.commands = new Discord.Collection();
client.prefix = prefix;

fs.readdirSync("./commands").filter( file => file.endsWith(".js")).forEach(
    file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name , command);
    }
)

client.on("ready", () => {
    console.log("Ready");
})

client.on("message", message => {
    if(!message.content.startsWith(client.prefix) || message.author.id === client.user.id) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    try {
        const command = client.commands.get(commandName);
        const permissions = command.permissions || [];
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(permissions)) return message.reply('You do not have permission(s) to do this');
        if(command.argsNumber && args.length < command.argsNumber) return message.reply(`You didn't provide all arguments\n Correct usage: \`${client.prefix}${command.name} ${command.usage}\``);
        command.execute(message, args);
    } 
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
})
client.login(token)
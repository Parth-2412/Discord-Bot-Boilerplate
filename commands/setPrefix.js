module.exports = {
    name : "set-prefix",
    description : "Sets the prefix for the bot",
    argsNumber : 1,
    usage : "<prefix>",
    permissions : ["ADMINISTRATOR"],
    execute(message, args){
        const prefix = args.shift();
        message.client.prefixes.set(message.guild.id, prefix);
        message.reply(`Prefix set to ${prefix}`);
    }
}
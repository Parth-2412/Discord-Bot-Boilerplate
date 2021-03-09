require("dotenv").config();

const token = process.env.TOKEN;

const Discord = require("discord.js")

const client = new Discord.Client()

client.on("ready", () => {
    console.log("Ready")
})
client.login(token)
# Discord Bot boilerplate

Made with node 15.8.0
Uses [discord.js](https://discord.js.org/) and typescript. Learn more [here](https://discordjs.guide/) 

## A complete discord js bot boilerplate with dynamic help command and set-prefix command. Works on multiple servers. Easy to set up and modify. Support for DMs.

# Setup

1. Install node js from here https://nodejs.org/en/
2. Clone the github repository. https://github.com/Parth-2412/Discord-Bot-Boilerplate. Run `git clone https://github.com/Parth-2412/Discord-Bot-Boilerplate`.
3. Go into the root directory. Run `cd Discord-Bot-Boilerplate`
4. Install dependencies. Run `npm install`
5. Create and invite a bot and get your bot token from [here](https://www.writebots.com/discord-bot-token/)
6. Now that you have your token, create a `.env` file in the root directory and in that .env file write `TOKEN=YOUR_BOT_TOKEN`
7. Start the bot. Run `npm start`.

    Thats's it!! Now you have a full funtioning basic discord bot, using discordjs, with out of the box type intellisense using typescript.

# Adding a command
 In the commands folder create a new js file for your command and enter the following in it:
 ```
import {  Message, Command} from "../types";
const command : Command = {
    name : "the name of the command. Required",

    description : "the description of the command. Required",

    argsNumber : 1, // the number of arguments the command requires default is 0

    permissions : ["ADMINISTRATOR"], // the list of permissions required to execute this command. Optional. Full list can be found https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
    
    usage : "example usage", // no need to use the command prefix and command name here, it is automatically prepended to the usage string. Optional

    guildOnly : true, // sets whether the command can only be executed in servers or not. Optional. If the permissions list is set then guildOnly will always be true.

    execute(message : Message,args : string[]){
        // function which is called when the command is executed
        // takes the message object and the list of arguments in the message as function arguments.
        // REQUIRED
    },

 }

 export default command;
 ```

 # Existing Commands
 1. help - `!help [command name]`. Lists all commands or info about a specific command. Only shows the commands which the users are allowed to see
 2. set-prefix `!set-prefix prefix`. Sets the prefix for a specific server. Default prefix is `!`. Change default prefix in `types.ts` line 3. The default prefix will be used in DMs.
const { Client, Events, GatewayIntentBits } = require("discord.js");
require('dotenv').config();
const token = process.env.TOKEN;

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));


async function initDiscord() {

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.login(token);
}

module.exports = { initDiscord }




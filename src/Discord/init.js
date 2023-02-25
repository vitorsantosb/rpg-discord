const { Client, Events, GatewayIntentBits } = require("discord.js");
require('dotenv').config();
const token = process.env.TOKEN;

const fs = require('node:fs');
const path = require('node:path');

async function getCommandList() {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readFileSync(commandsPath).filter(file => file.endsWith(".js"));
    console.log(commandFiles);
}

async function initDiscord() {

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    await getCommandList();

    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.login(token);
}

module.exports = { initDiscord }




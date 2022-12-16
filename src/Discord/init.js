const { Client, Events, GatewayIntentBits } = require("discord.js");
require('dotenv').config();
const token = process.env.TOKEN;

async function discordInitialize() {

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    const commands = new Map();

    const preCommands = [
        require('./command/ping'),
    ];

    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.login(token);
}

module.exports = { discordInitialize };



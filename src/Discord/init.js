const { Client, Events, GatewayIntentBits } = require("discord.js");
require('dotenv').config();
const token = process.env.TOKEN;

const fs = require('node:fs');
const path = require('node:path');


async function discordInitialize() {

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    const commands = new Map();

    client.on(Events.InteractionCreate, async interaction => {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.login(token);
}

module.exports = { discordInitialize };



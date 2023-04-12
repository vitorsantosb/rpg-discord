const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;

const fs = require('node:fs');
const path = require('node:path');

function LoadCommands(client) {
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log(`[Command]: /${command.data.name} was loaded`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

async function LoadEvents(client) {
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}

		console.log(`[Event]: ${event.name} was loaded ${event.once ? '(once)' : ''}`);
	}
}

async function InitCommands() {
	const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
	client.commands = new Collection();
    
	LoadCommands(client);
	await LoadEvents(client);

	client.login(token);
}

module.exports = { InitCommands };




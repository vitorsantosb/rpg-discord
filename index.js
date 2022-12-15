const {Client, Events, GatewayIntentBits} = require("discord.js");
const { init } = require("./src/database/database.js");
require('dotenv').config();


const token = process.env.TOKEN;

const client = new Client({intents: [GatewayIntentBits.Guilds]});

const commands = new Map();

const preCommands = [
    require('./src/command/ping.js'),
];

client.once(Events.ClientReady, c=>{
    console.log(`Ready! Logged in as ${c.user.tag}` );
});

client.login(token);

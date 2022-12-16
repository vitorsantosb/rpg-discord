const { discordInitialize } = require("./src/Discord/init");

async function turnOn() {
    await discordInitialize();
}

turnOn();
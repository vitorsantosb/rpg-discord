const { discordInitialize } = require("./src/Discord/init");
const { init_routes } = require("./src/server/server");

async function turnOn() {
    
    await init_routes();
    await discordInitialize();
    
}

turnOn();
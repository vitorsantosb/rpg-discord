const { discordInitialize } = require("./src/Discord/init");
const { initDatabase } = require("./src/server/database/database");
const { init_routes } = require("./src/server/server");

async function init() {
    
    await init_routes();
    await discordInitialize();
    await initDatabase();
}

init();
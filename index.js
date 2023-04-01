const { initCommands } = require("./src/Discord/init");
const { initDiscordServer } = require("./src/server/server");

async function init() {
    await initDiscordServer();
    await initCommands();
}

init().catch(function(err){
    console.log(err);
});
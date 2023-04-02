const { initCommands } = require("./src/Discord/init");

async function init() {
    await initCommands();
}

init().catch(function(err){
    console.log(err);
});
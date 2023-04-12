const { InitCommands } = require('./src/Discord/init');
const {SetupLangFiles} = require('./src/Discord/services/lang');

async function init() {
	await SetupLangFiles();
	await InitCommands();
}

init().catch(function(err){
	console.log(err);
});
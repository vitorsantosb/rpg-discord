function CreateGuildData(guild){
	return {
		guild,

		isSetup: true,
		botRolesIds:[
			//roles created by bot
		],
	};
}

module.exports = { CreateGuildData };
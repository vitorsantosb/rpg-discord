function CreateGuildData(guild){
	return {
		guild,

		isSetup: true,
		botRolesIds:[
			//roles created by bot
		],
	};
}

function CreateBasicGuildRef ({id, name}) {
	return {id, name};
}

module.exports = { CreateGuildData, CreateBasicGuildRef };
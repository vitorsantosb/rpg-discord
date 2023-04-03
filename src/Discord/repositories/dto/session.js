
function CreateGameMasterFromInteraction(interaction){
	return CreateSessionUserFromInteraction(interaction);
}

function CreateSessionUserFromInteraction(interaction){
	return {
		user:{
			id: interaction.user.id,
			username: interaction.user.username,
			discriminator: interaction.user.discriminator,
		},
		guild:{
			id: interaction.guild.id,
			name: interaction.guild.name,
		}
	};
}
function CreateSessionMemberFromInteraction(interaction){
	const member = CreateSessionUserFromInteraction(interaction);

	return {
		...member,

		'rolls': []
	};
}


module.exports = { CreateGameMasterFromInteraction, CreateSessionMemberFromInteraction };
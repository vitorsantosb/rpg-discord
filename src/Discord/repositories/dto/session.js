const {CreateUserData} = require('./user');

function CreateGameMasterFromInteraction(interaction) {
	return CreateSessionUserFromInteraction(interaction);
}

function CreateSessionUserFromInteraction(interaction) {
	return CreateUserData(interaction.user, interaction.guild);
}

function CreateSessionMemberFromInteraction(interaction) {
	const member = CreateSessionUserFromInteraction(interaction);

	return {
		...member,

		'rolls': []
	};
}


module.exports = {CreateGameMasterFromInteraction, CreateSessionMemberFromInteraction};
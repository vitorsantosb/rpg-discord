const {GetDatabase} = require('../database/db');
const {CreateGameMasterFromInteraction} = require('./dto/session');

async function SessionExists(interaction, name){
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'owner.guild.id': interaction.guild.id,
		name,
	}, {'_id' : 1});
}

async function CreateSession(interaction){
	const {collections} = await GetDatabase();

	const owner = CreateGameMasterFromInteraction(interaction);

	const session = {
		name: interaction.options.getString('name'),
		maxMemberCount: interaction.options.getInteger('max_members_count') ?? 5,
		owner,

		gameMaster: [owner],
		members: []
	};
	
	return collections.sessions.insertOne(session);
}


module.exports = {CreateSession, SessionExists };
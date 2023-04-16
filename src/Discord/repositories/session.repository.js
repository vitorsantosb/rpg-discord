const {GetDatabase} = require('../database/db');
const {CreateGameMasterFromInteraction} = require('./dto/session');

async function SessionExists(interaction, name) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'session.owner.guild.id': interaction.guild.id,
		'session.name': name,
	}, {'_id': 1});
}

async function CreateSession(interaction) {
	const {collections} = await GetDatabase();

	const owner = CreateGameMasterFromInteraction(interaction);

	const session = {
		session: {
			name: interaction.options.getString('name'),
			maxMemberCount: interaction.options.getInteger('max_members_count') ?? 5,
			isPublic: interaction.options.getBoolean('is_public') ?? true,

			owner,

			gameMaster: [owner],
			members: []
		}
	};

	return collections.sessions.insertOne(session);
}


async function ListGuildSessions(interaction) {
	const {collections} = await GetDatabase();

	return collections.sessions.find({'session.owner.guild.id': interaction.guild.id.toString()}).toArray();
}

async function AddUserInSession(user, sessionName) {
	const {collections} = await GetDatabase();


	return collections.sessions.updateOne({'session.name': sessionName}, {
		$push: {
			'session.members': user.id
		}
	});
}

async function ExistsUserInSession(user, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'session.name': sessionName,
		'members': user.id,
	}, {'_id': 1});
}

module.exports = {
	CreateSession,
	SessionExists,
	ListGuildSessions,
	AddUserInSession,
	ExistsUserInSession
};
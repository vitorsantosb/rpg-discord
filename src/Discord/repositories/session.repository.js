const {GetDatabase} = require('../database/db');
const {CreateGameMasterFromInteraction} = require('./dto/session');
const {CreateBasicGuildRef} = require('./dto/guild');
const {CreateUserData} = require('./dto/user');

async function SessionExists(interaction, name) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'owner.guild.id': interaction.guild.id,
		'name': name,
	}, {'_id': 1});
}

async function CreateSession(interaction) {
	const {collections} = await GetDatabase();

	const owner = CreateGameMasterFromInteraction(interaction);

	const session = {
		guild: CreateBasicGuildRef(interaction.guild),

		name: interaction.options.getString('name'),
		maxMemberCount: interaction.options.getInteger('max_members_count') ?? 5,
		isPublic: interaction.options.getBoolean('is_public') ?? true,

		owner,

		gameMaster: [owner],
		members: []
	};

	return collections.sessions.insertOne(session);
}

async function ListGuildSessions(interaction) {
	const {collections} = await GetDatabase();

	return collections.sessions.find({
		'owner.guild.id': interaction.guild.id.toString()
	}).toArray();
}

async function AddSessionMember(interaction, user, sessionName) {
	const {collections} = await GetDatabase();

	const member = CreateUserData(user, interaction.guild);

	return collections.sessions.updateOne({'name': sessionName}, {
		$push: {
			'members': member
		}
	});
}

async function ExistsUserInSession(user, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'name': sessionName,
		'members': user.id,
	}, {'_id': 1});
}

module.exports = {
	CreateSession,
	SessionExists,
	ListGuildSessions,
	AddSessionMember,
	ExistsUserInSession
};
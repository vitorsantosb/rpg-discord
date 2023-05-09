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
		members: [],
		botChannels: [],
		sessionRole: [],
		isInitialized: false,
	};

	return collections.sessions.insertOne(session);
}

async function ListGuildSessions(interaction) {
	const {collections} = await GetDatabase();

	return collections.sessions.find({
		'guild.id': interaction.guild.id.toString()
	}).toArray();
}

async function SessionIsPublic(guildId, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'name': sessionName,
		'guild.id': guildId,
		'isPublic': true,
	}, {'_id': 1});
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

async function RemoveSessionMember(guildId, memberId, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne({
		'guild.id': guildId,
		'name': sessionName,

	}, {
		$pull: {
			members: {
				'user.id': memberId
			}
		}
	});
}

async function DeleteSessionByName(guildId, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.deleteOne(
		{
			'guild.id': guildId,
			'name': sessionName
		});
}

async function ExistsUserInSession(user, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'name': sessionName,
		'members.user.id': user.id,
	}, {'_id': 1});
}

async function GetSessionMembers(guildId, sessionName) {
	const {collections} = await GetDatabase();

	return collections.sessions.findOne({
		'name': sessionName,
		'members.guild.id': guildId
	}, {
		members: 1
	});
}

async function UpdateMemberRoleInSession(guildId, sessionName, memberId, roleId) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne({
		'name': sessionName,
		'guild.id': guildId,

	}, {
		$push: {
			members: {
				'user.id': memberId,
				'role': {
					'id': roleId
				}
			}
		}
	});
}

async function UpdateSessionChannelsData(guildId, sessionName, createdBotChannels) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne({'name': sessionName}, {
		$set: {
			'botChannels': createdBotChannels
		}
	});
}

async function UpdateSessionRole(guildId, sessionName, roleId) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne(
		{
			'name': sessionName,
			'guild.id': guildId
		},
		{
			$push: {
				'sessionRole': roleId
			}
		});
}

async function GetSessionChannelsId(sessionName, guildId) {
	const {collections} = await GetDatabase();

	return collections.sessions.findOne({
		'name': sessionName,
		'guild.id': guildId
	}, {
		botChannels: 1
	});
}

async function DeleteSessionChannelInDb(sessionName, guildId, roleId) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne({
		'guild.id': guildId,
		'name': sessionName,

	}, {
		$pull: {
			botChannels: {
				'id': roleId
			}
		}
	});
}

async function DeleteSessionRoleInDbWithId(sessionName, guildId, roleId) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne({
		'guild.id': guildId,
		'name': sessionName,

	}, {
		$pull: {
			sessionRole: {
				'id': roleId
			}
		}
	});
}

async function UpdateInitializedStatus(sessionName, guildId, isInitialized) {
	const {collections} = await GetDatabase();

	return collections.sessions.updateOne({
		'name': sessionName,
		'guild.id': guildId

	}, {
		$set: {
			'isInitialized': isInitialized
		}
	});
}

async function CheckSessionInitializedStatus(sessionName, guildId) {
	const {collections} = await GetDatabase();

	return collections.sessions.countDocuments({
		'name': sessionName,
		'guild.id': guildId,
		'isInitialized': true,
	}, {'_id': 1});
}

async function GetSessionRoleId(sessionName, guildId) {
	const {collections} = await GetDatabase();

	return collections.sessions.findOne({
		'name': sessionName,
		'guild.id': guildId
	}, {
		sessionRole: {
			id: 1
		}
	});
}


module.exports = {
	CreateSession,
	SessionExists,
	ListGuildSessions,
	AddSessionMember,
	ExistsUserInSession,
	DeleteSessionByName,
	SessionIsPublic,
	RemoveSessionMember,
	GetSessionMembers,
	UpdateSessionChannelsData,
	UpdateSessionRole,
	UpdateMemberRoleInSession,
	GetSessionChannelsId,
	DeleteSessionChannelInDb,
	DeleteSessionRoleInDbWithId,
	UpdateInitializedStatus,
	CheckSessionInitializedStatus,
	GetSessionRoleId
};
const {ChannelType} = require('discord.js');

/**
 *
 * @param guild
 * @param channelName
 * @param permissionsOverwrites
 * @param parent
 * @returns {Promise<void>}
 * @constructor
 */
async function CreateSessionTextChannel(guild, channelName, permissionsOverwrites, parent) {

	return guild.channels.create({
		name: channelName,
		type: ChannelType.GuildText,
		parent: parent,

		permissionsOverwrites
	});
}

async function CreateSessionVoiceChannel(guild, channelName, permissionsOverwrites, parent = null) {

	return guild.channels.create({
		name: channelName,
		type: ChannelType.GuildVoice,
		parent: parent,

		permissionsOverwrites
	});
}

async function CreateSessionCategory(guild, channelName, permissionsOverwrites, parent = null) {

	return guild.channels.create({
		name: channelName,
		type: ChannelType.GuildCategory,
		parent: parent,

		permissionsOverwrites
	});
}

async function DeleteSessionChannelWithId(sessionName, guild, channelId,) {
	const fetchedChannel = guild.channels.cache.get(channelId);
	fetchedChannel.delete();
}


module.exports = {
	CreateSessionTextChannel,
	DeleteSessionChannelWithId,
	CreateSessionCategory,
	CreateSessionVoiceChannel
};
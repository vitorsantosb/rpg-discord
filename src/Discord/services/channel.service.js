const config = require('../config/config.json');
const {ChannelType} = require('discord.js');

function GetSessionRoleNameWithSessionName(sessionName) {
	return config.roleNamePrefix + ' - ' + sessionName;
}

function CreateSessionName(sessionName) {
	return config.roleNamePrefix + ' - ' + sessionName;
}

function GetChannelNames() {
	return GetSessionChannels.map(channel => channel.name);
}

function GetSessionChannels() {
	return [
		{name: 'general', type: ChannelType.GuildText},
		{name: 'master-channel', type: ChannelType.GuildText},
		{name: 'players-dice', type: ChannelType.GuildText},
		{name: 'notes', type: ChannelType.GuildText},
		{name: 'voice-channel', type: ChannelType.GuildVoice}
	];
}

module.exports = {GetSessionRoleNameWithSessionName, CreateSessionName, GetChannelNames, GetSessionChannels};
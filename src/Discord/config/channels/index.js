const {PermissionFlagsBits} = require('discord.js');

/**
 *
 * @returns {*} object with channel permissions.
 * @constructor
 */
function GetChannelPermissionsFlags() {
	return {ViewChannel, ReadMessageHistory, SendMessages, Connect, Speak} = PermissionFlagsBits;
}

function GetSessionChannelPermissions() {
	const permissionsFlags = new GetChannelPermissionsFlags();

	return [
		{
			name: 'session_role',
			allow: [permissionsFlags.ViewChannel, permissionsFlags.SendMessages, permissionsFlags.ReadMessageHistory],
		},
		{
			name: 'everyone',
			deny: [permissionsFlags.ViewChannel, permissionsFlags.SendMessages, permissionsFlags.ReadMessageHistory],
		},
	];
}


function SetupArrayOfPermissionsOverwrites(roles) {
	const permissions = GetSessionChannelPermissions();
	const sessionRole = permissions.find(permission => permission.name === 'session_role');

	return roles.map(role => permissions.find(permission => permission.name === role.name) || sessionRole);
}

module.exports = {SetupArrayOfPermissionsOverwrites};
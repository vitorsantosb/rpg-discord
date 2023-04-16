const {PermissionsBitField} = require('discord.js');
const {roleNamePrefix} = require('../config.json');

module.exports = {
	name: `${roleNamePrefix} Admin`,
	slug: 'admin',

	permissions: [
		PermissionsBitField.Flags.SendMessages,
		PermissionsBitField.Flags.KickMembers
	]
};

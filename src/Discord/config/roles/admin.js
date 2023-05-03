const {PermissionsBitField} = require('discord.js');
const {roleNamePrefix} = require('../config.json');

module.exports = {
	name: `${roleNamePrefix} Admin`,
	slug: 'admin',
	badgeColor: '#1965E9',

	permissions: [
		PermissionsBitField.Flags.SendMessages,
		PermissionsBitField.Flags.KickMembers
	]
};

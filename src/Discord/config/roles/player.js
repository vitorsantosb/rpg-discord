const {PermissionsBitField} = require('discord.js');
const {roleNamePrefix} = require('../config.json');

module.exports = {
	name: `${roleNamePrefix} Player`,
	slug: 'player',
	badgeColor: '#1965E9',

	permissions: [
		PermissionsBitField.Flags.SendMessages,
	]
};

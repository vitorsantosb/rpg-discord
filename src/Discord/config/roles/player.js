const {PermissionsBitField} = require('discord.js');
const {roleNamePrefix} = require('../config.json');

module.exports = {
	name: `${roleNamePrefix} Player`,
	slug: 'player',

	permissions: [
		PermissionsBitField.Flags.SendMessages,
	]
};

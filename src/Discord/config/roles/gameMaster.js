const {PermissionsBitField} = require('discord.js');
const {roleNamePrefix} = require('../config.json');

module.exports = {
	name: `${roleNamePrefix} GameMaster`,
	slug: 'game-master',

	permissions: [
		PermissionsBitField.Flags.SendMessages,
		PermissionsBitField.Flags.KickMembers
	]
};

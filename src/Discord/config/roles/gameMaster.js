const {PermissionsBitField} = require('discord.js');
const {roleNamePrefix} = require('../config.json');

module.exports = {
	name: `${roleNamePrefix} GameMaster`,
	slug: 'game-master',
	badgeColor: '#1965E9',

	permissions: [
		PermissionsBitField.Flags.SendMessages,
		PermissionsBitField.Flags.KickMembers
	]
};

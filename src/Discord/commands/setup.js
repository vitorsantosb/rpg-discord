const {SlashCommandBuilder, PermissionsBitField} = require('discord.js');
const {ExistsRoleInGuild, CreateRole, AssignRoleToUser} = require('../repositories/roleManager.repository');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Receive a role for manager the bot - Obs: This function is enabled for server owner'),

	execute: async function (interaction) {
		const {user, guild} = interaction;
		const roleName = 'RPG-Admin';

		const permissions = [
			PermissionsBitField.Flags.SendMessages,
			PermissionsBitField.Flags.KickMembers
		];

		if (guild.ownerId === user.id) {

			if (ExistsRoleInGuild(guild, roleName)) {
				interaction.reply(`You needed delete the role ${roleName}, for continue this command`);
				return;
			}

			await CreateRole(guild, roleName, permissions, '#1965E9');
			await AssignRoleToUser(interaction, roleName);

			interaction.reply(`Setup Complete. The server owner ${user.username} receive the role ${roleName}`);
			return;
		}

		interaction.reply('This command can only used by guild owner');
	}
};
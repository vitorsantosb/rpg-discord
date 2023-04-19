const {SlashCommandBuilder} = require('discord.js');
const {UpdateUserForGameMaster, FetchUserDataById} = require('../repositories/user.repository');
const {AssignRoleToUser, RemoveUserRole, ExistsRoleInUser} = require('../repositories/roleManager.repository');
const {GetRoles} = require('../services/role.service');
const {GetFullUsername} = require('../services/user.service');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_gamemaster')
		.setDescription('setup game master with mention')
		.addMentionableOption(option => (
			option
				.setName('user')
				.setDescription('Set one user for a rpg game master')
				.setRequired(true)
		))
		.addBooleanOption(option => (
			option
				.setName('is_master')
				.setDescription('Enabled ?')
				.setRequired(true)
		))
		.addStringOption(option => (
			option
				.setName('reason')
				.setDescription('reason')
				.setRequired(false)
		)),

	execute: async function (interaction) {
		const {user} = interaction.options.getMentionable('user');
		const boolean = interaction.options.getBoolean('is_master');
		const reason = interaction.options.getString('reason');

		if (await FetchUserDataById(user.id)) {
			const roles = GetRoles();
			const gameMasterRole = roles.find(role => role.slug === 'game-master');

			if (boolean) {
				if (!await ExistsRoleInUser(interaction.guild, user, gameMasterRole.name)) {

					await AssignRoleToUser(interaction.guild, user, gameMasterRole.name);
					await UpdateUserForGameMaster(user.id, boolean);

					return interaction.reply(`This user ${GetFullUsername(user)} now is new RPG master by ${GetFullUsername(interaction.user)}`);
				}

				return interaction.reply(`This member ${user.tag} is already a ${gameMasterRole.name}`);
			}
			await RemoveUserRole(interaction.guild, user, gameMasterRole.name);
			await UpdateUserForGameMaster(user.id, false);

			return interaction.reply(`This user ${GetFullUsername(user)} lose GameMaster by ${GetFullUsername(interaction.user)} reason: ${reason ?? 'Not informed'}`);
		}

		interaction.reply(`The guild member: "${user.tag}", must register for receive the role`);
	}
};
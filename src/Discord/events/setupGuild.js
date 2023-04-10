const {Events, PermissionsBitField} = require('discord.js');
const {
	CreateRole,
	AssignRoleToUser,
	ExistsRoleInGuild,
	DeleteGuildRole
} = require('../repositories/roleManager.repository');
const {SetupGuildFromInteraction, IsGuildSetupById} = require('../repositories/guild.repository');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			const custom_id = interaction.customId;

			if (custom_id === 'command_setup_accept') {
				const {user, guild} = interaction;

				if(await IsGuildSetupById(guild.id)){
					return interaction.reply('Guild is already setup');
				}

				const ownerRoleName = '[RPG-BOT] Admin';
				const gameMasterRoleName = '[RPG-BOT] GameMaster';

				const permissions = [
					PermissionsBitField.Flags.SendMessages,
					PermissionsBitField.Flags.KickMembers
				];

				if (ExistsRoleInGuild(guild, ownerRoleName)) {
					await DeleteGuildRole(interaction, ownerRoleName);
				}

				if (ExistsRoleInGuild(guild, gameMasterRoleName)) {
					await DeleteGuildRole(interaction, gameMasterRoleName);
				}

				const gameMasterRole = await CreateRole(guild, gameMasterRoleName, permissions, '#1965E9');
				const ownerRole = await CreateRole(guild, ownerRoleName, permissions, '#1965E9');
				await AssignRoleToUser(interaction, ownerRoleName);

				await SetupGuildFromInteraction(interaction, {
					botRolesIds: [
						gameMasterRole.id,
						ownerRole.id,
					]
				});

				interaction.reply(`Setup Complete. The server owner ${user.username} receive the role ${ownerRoleName}`);
			}else if(custom_id === 'command_setup_cancel'){
				interaction.reply('Operation canceled');
			}

		}

	}
};
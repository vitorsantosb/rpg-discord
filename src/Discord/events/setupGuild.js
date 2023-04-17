const {Events, PermissionsBitField} = require('discord.js');
const {
	CreateRole,
	AssignRoleToUser,
	ExistsRoleInGuild,
	DeleteGuildRole
} = require('../repositories/roleManager.repository');
const {SetupGuildFromInteraction, IsGuildSetupById} = require('../repositories/guild.repository');
const {Lang} = require('../services/lang');
const {GetFullUsername} = require('../services/user.service');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			const custom_id = interaction.customId;
			const lang = Lang(interaction).commands.setup;

			if (custom_id === 'command_setup_accept') {
				const {user, guild} = interaction;

				if(await IsGuildSetupById(guild.id)){
					return interaction.reply(lang.setupEvent.isSetup);
				}

				const ownerRoleName = '[RPG-BOT] Admin';
				const gameMasterRoleName = '[RPG-BOT] GameMaster';
				const playerRole = '[RPG-BOT] Player';

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

				if(ExistsRoleInGuild(guild, playerRole)){
					await DeleteGuildRole(interaction, playerRole);
				}

				const gameMasterRole = await CreateRole(guild, gameMasterRoleName, permissions, '#1965E9');
				const ownerRole = await CreateRole(guild, ownerRoleName, permissions, '#1965E9');
				const memberRole = await CreateRole(guild, playerRole, permissions, '#1965E9');
				await AssignRoleToUser(interaction, ownerRoleName);

				await SetupGuildFromInteraction(interaction, {
					botRolesIds: [
						gameMasterRole.id,
						ownerRole.id,
						memberRole.id,
					]
				});

				interaction.reply(lang.setupEvent.setup_complete_reply(GetFullUsername(user), ownerRoleName));
			}else if(custom_id === 'command_setup_cancel'){
				interaction.reply(lang.setupEvent.cancel_setup);
			}

		}

	}
};
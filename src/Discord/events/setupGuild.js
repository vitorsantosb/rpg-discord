const {Events} = require('discord.js');
const {
	CreateRole,
	AssignRoleToUser,
	ExistsRoleInGuild,
	DeleteGuildRole
} = require('../repositories/roleManager.repository');
const {SetupGuildFromInteraction, IsGuildSetupById} = require('../repositories/guild.repository');
const {Lang} = require('../services/lang');
const {GetFullUsername} = require('../services/user.service');
const {GetRoles} = require('../services/role.service');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			const custom_id = interaction.customId;
			const lang = Lang(interaction).commands.setup;

			if (custom_id === 'command_setup_accept') {
				const {user, guild} = interaction;

				if (await IsGuildSetupById(guild.id)) {
					return interaction.reply(lang.setupEvent.isSetup);
				}

				const roles = GetRoles();
				const botRolesIds = [];

				const adminRole = roles.find(role => role.slug === 'admin');

				for (const role of roles) {
					if (ExistsRoleInGuild(guild, role.name)) {
						await DeleteGuildRole(interaction, role.name);
					}

					const createdRole = await CreateRole(guild, role.name, role.permissions, role.badgeColor);

					botRolesIds.push(createdRole.id);
				}

				await AssignRoleToUser(interaction, adminRole.name);

				await SetupGuildFromInteraction(interaction, {botRolesIds});

				interaction.reply(lang.setupEvent.setup_complete_reply(GetFullUsername(user), adminRole.name));
			} else if (custom_id === 'command_setup_cancel') {
				interaction.reply(lang.setupEvent.cancel_setup);
			}

		}

	}
};
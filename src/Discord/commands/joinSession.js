const {SlashCommandBuilder} = require('discord.js');
const {
	SessionIsPublic,
	AddSessionMember,
	SessionExists,
	ExistsUserInSession, CheckSessionInitializedStatus,
} = require('../repositories/session.repository');
const {GetFullUsername} = require('../services/user.service');
const {ExistsRoleInUser, AssignRoleToUser} = require('../repositories/roleManager.repository');
const {GetSessionRoleNameWithSessionName} = require('../services/channel.service');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('join a exists session')
		.addStringOption(option =>
			option
				.setName('session')
				.setDescription('session name for join')
				.setRequired(true)
		),

	async execute(interaction) {
		const {guild} = interaction;
		const sessionName = interaction.options.getString('session');

		if (!await SessionExists(interaction, sessionName)) {
			return interaction.reply(`The session where you try enter "${sessionName}" not exists`);
		}

		if (await SessionIsPublic(interaction.guild.id, sessionName)) {
			if (!await ExistsUserInSession(interaction.user, sessionName)) {
				await AddSessionMember(interaction, interaction.user, sessionName);

				if (await CheckSessionInitializedStatus(sessionName, guild.id)) {
					const sessionRoleName = GetSessionRoleNameWithSessionName(sessionName);

					if (!await ExistsRoleInUser(guild, interaction.user, sessionRoleName)) {
						await AssignRoleToUser(guild, interaction.user, sessionRoleName);

						return interaction.reply(`You Join in session ${sessionName}, and receive the session role ${sessionRoleName} Good Game!!!`);
					}
				}
				return interaction.reply(`You Join in session ${sessionName}, Good Game!!!`);
			} else {
				return interaction.reply(`Member "${GetFullUsername(interaction.user)}" is already in session`);
			}
		}
		return interaction.reply('Private Session you needed invite for join in session! Or the GameMaster add your in session');
	},
};

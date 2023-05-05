const {SlashCommandBuilder} = require('discord.js');
const {
	SessionExists,
	GetSessionChannelsId,
	DeleteSessionChannelInDb,
	DeleteSessionByName, UpdateInitializedStatus, DeleteSessionRoleInDbWithId
} = require('../repositories/session.repository');
const {DeleteSessionChannelWithId} = require('../repositories/channel.repository');
const {DeleteGuildRole} = require('../repositories/roleManager.repository');
const {GetSessionRoleNameWithSessionName} = require('../services/channel.service');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('end_session')
		.setDescription('finish or close your session')
		.addStringOption(option => (
			option
				.setName('session')
				.setDescription('session name for finish')
				.setRequired(true)
		))
		.addBooleanOption(option => (
			option
				.setName('delete_session')
				.setDescription('You wan\'t delete your session ? WARNING: If you agree your session is deleted')
				.setRequired(true)
		)),

	async execute(interaction) {
		const {guild} = interaction;

		const sessionName = interaction.options.getString('session');
		const deleteSession = interaction.options.getBoolean('delete_session') ?? false;

		if (await SessionExists(interaction, sessionName)) {
			const session = await GetSessionChannelsId(sessionName, guild.id);

			for (const channel of session.botChannels) {
				await DeleteSessionChannelWithId(sessionName, guild, channel.id);
				await DeleteSessionChannelInDb(sessionName, guild.id, channel.id);
			}

			await UpdateInitializedStatus(sessionName, guild.id, false);

			if (deleteSession) {
				await DeleteSessionByName(guild.id, sessionName);
				await DeleteSessionRoleInDbWithId(sessionName, guild.id, session.sessionRole.id);
				await DeleteGuildRole(guild, GetSessionRoleNameWithSessionName(sessionName));

				return interaction.reply('Session has been deleted successfully and all channels is deleted');
			}

			return interaction.reply('All session channels deleted successfully');
		}
		return interaction.reply('Failure for delete session');
	},
};

const {SlashCommandBuilder} = require('discord.js');
const {AddSessionMember, SessionExists, DeleteSessionByName} = require('../repositories/session.repository');
const {GetFullUsername} = require('../services/user.service');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete_session')
		.setDescription('Delete one session using the session name')
		.addStringOption(option => (
			option
				.setName('session_name')
				.setDescription('Session name for delete')
				.setRequired(true)
		)),

	async execute(interaction) {
		const sessionName = interaction.options.getString('session_name');

		if (await SessionExists(interaction, sessionName)) {
			await DeleteSessionByName(interaction.guild.id, sessionName);

			return interaction.reply(`The session ${sessionName} is Removed by GameMaster/admin ${interaction.user.username + '#' + interaction.user.discriminator}`);
		}

		interaction.reply('Failure to remove session.');
	},
};
const {SlashCommandBuilder} = require('discord.js');
const {AddUserInSession, ExistsSessionByName} = require('../repositories/session.repository');
const {GetFullUsername} = require('../services/user.service');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_session_member')
		.setDescription('Randomizer a body part')
		.addMentionableOption(option => (
			option
				.setName('user')
				.setDescription('user for add in session')
				.setRequired(true)
		))
		.addStringOption(option => (
			option
				.setName('session_name')
				.setDescription('Session name for enters')
				.setRequired(true)
		)),

	async execute(interaction) {
		const sessionName = interaction.options.getString('session_name');
		const {user} = interaction.options.getMentionable('user');

		if (await ExistsSessionByName(sessionName)) {

			await AddUserInSession(user, sessionName);
			return interaction.reply(`New member ${GetFullUsername(user)} added on session ${sessionName} by GameMaster ${interaction.user.username + '#' + interaction.user.discriminator}`);
		}
		interaction.reply('Session does not exists');
	},
};
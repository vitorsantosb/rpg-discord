const {SlashCommandBuilder} = require('discord.js');
const {GetFullUsername} = require('../services/user.service');
const {SessionExists, ExistsUserInSession, RemoveSessionMember} = require('../repositories/session.repository');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_session_member')
		.setDescription('Remove member from session')
		.addMentionableOption(option =>
			option
				.setName('user')
				.setDescription('member name')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('session')
				.setDescription('session name')
				.setRequired(true)
		),

	async execute(interaction) {
		const sessionName = interaction.options.getString('session');
		const {user} = interaction.options.getMentionable('user');

		if (!await SessionExists(interaction, sessionName)) {
			return interaction.reply(`Session with name "${sessionName}" does not exists`);
		}

		if (await ExistsUserInSession(user, sessionName)) {
			await RemoveSessionMember(interaction.guild.id, user.id, sessionName);

			return interaction.reply(`Member: "${GetFullUsername(user)}" as removed from session "${sessionName}"`);
		} else {
			return interaction.reply(`The member "${GetFullUsername(user)}" does exists in session`);
		}


	},
};
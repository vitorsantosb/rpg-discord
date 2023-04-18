const {SlashCommandBuilder} = require('discord.js');
const {
	SessionIsPublic,
	AddSessionMember,
	SessionExists,
	ExistsUserInSession
} = require('../repositories/session.repository');
const {GetFullUsername} = require('../services/user.service');


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
		const sessionName = interaction.options.getString('session');

		if (!await SessionExists(interaction, sessionName)) {
			return interaction.reply(`The session where you try enter "${sessionName}" not exists`);
		}

		if (await SessionIsPublic(interaction.guild.id, sessionName)) {
			if (await ExistsUserInSession(interaction.user, sessionName)) {
				await AddSessionMember(interaction, interaction.user, sessionName);

				return interaction.reply(`You Join in session ${sessionName}, Good Game!!!`);
			} else {
				return interaction.reply(`Member "${GetFullUsername(interaction.user)}" is already in session`);
			}
		}
	},
};

const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {ListGuildSessions} = require('../repositories/session.repository');
const {GetFullUsername} = require('../services/user.service');
const {bot} = require('../config/config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('list_session')
		.setDescription('list of sessions existent in guild'),

	async execute(interaction) {
		const sessions = await ListGuildSessions(interaction);

		if (sessions <= 1) {
			return interaction.reply('Não há sessões criadas nesse servidor');
		}
		const embed = new EmbedBuilder()
			.setTitle('Guild Sessions')
			.setColor(bot.embedColor);

		const arrayOfSessions = [];

		for (const session of sessions) {
			arrayOfSessions.push({
					name: 'session',
					value: session.name,
					inline: true
				},
				{
					name: 'session owner',
					value: `${GetFullUsername(session.owner.user)}`,
					inline: true
				}, {
					name: 'slots available',
					value: (session.maxMemberCount - session.members.length) + '/' + session.maxMemberCount,
					inline: true
				});
		}

		embed.addFields(arrayOfSessions);

		interaction.reply({embeds: [embed]});

	},
};




const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {ListGuildSessions} = require('../repositories/session.repository');
const {GetFullUsername} = require('../services/user.service');
const {bot} = require('../config/config.json');


function CreateEmbedForSession({session}) {
	return new EmbedBuilder()
		//.setTitle('Imprimindo lista de sessões')
		.setColor(bot.embedColor)
		//.setDescription('Lista de sessões do servidor')
		/*.setAuthor({
			name: bot.name,
			iconURL: bot.thumbnail
		})*/
		.addFields([
			{
				name: 'Sessions',
				value: session.name,
				inline: true
			},
			{
				name: 'Session Owner',
				value: GetFullUsername(session.owner.user),
				inline: true
			},
			{
				name: 'Slots Available',
				value: (session.maxMemberCount - session.members.length) + '/' + session.maxMemberCount,
				inline: true
			}
		]);
	//.setThumbnail(bot.thumbnail)
	/*.setFooter({
			text: bot.name,
			iconURL: bot.thumbnail
		});
		*/
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list_session')
		.setDescription('list of sessions existent in guild'),

	async execute(interaction) {
		const sessions = await ListGuildSessions(interaction);

		const embeds = sessions.map(CreateEmbedForSession);

		interaction.reply({embeds});
	},
};
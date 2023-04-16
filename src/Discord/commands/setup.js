const { SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require('discord.js');
const {Lang} = require('../services/lang');
const {AddTranslations} = require('../services/command.service');
const {GetRolesName} = require('../services/role.service');


let command =  new SlashCommandBuilder()
	.setName('setup')
	.setDescription('Receive a role for manager the bot - Obs: This function is enabled for server owner');

command = AddTranslations(command, (lang) => ({name: lang.lang, value: lang?.commands?.setup}));

module.exports = {
	data: command,

	execute: async function (interaction) {
		const lang = Lang(interaction).commands.setup;

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('command_setup_cancel')
					.setLabel(lang.labels.command_setup_cancel)
					.setStyle(ButtonStyle.Danger),

				new ButtonBuilder()
					.setCustomId('command_setup_accept')
					.setLabel(lang.labels.command_setup_accept)
					.setStyle(ButtonStyle.Success),
			);
		const buttonIds = ['command_setup_accept', 'command_setup_cancel'];
		const filter = i => buttonIds.includes(i.customId) && i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000});

		collector.on('collect', async () => {
			row.components[0].setDisabled(true); //disables but_1
			row.components[1].setDisabled(true); //disables but_2

			await interaction.editReply({components: [row]});
		});

		const embed = new EmbedBuilder()
			.setTitle(lang.warning.title)
			.setDescription(lang.warning.description(
				GetRolesName.join(', ')
			));

		interaction.reply({content: lang.reply, embeds: [embed], components: [row]});
	}
};
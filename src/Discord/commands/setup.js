const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonStyle,
	ButtonBuilder,
	EmbedBuilder
} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Receive a role for manager the bot - Obs: This function is enabled for server owner'),

	execute: async function (interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('command_setup_cancel')
					.setLabel('Cancel')
					.setStyle(ButtonStyle.Danger),

				new ButtonBuilder()
					.setCustomId('command_setup_accept')
					.setLabel('Agree')
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
			.setTitle('WARNING')
			.setDescription('This command requires a set of role names, so it will delete and recreate these roles: RPG-Admin, GameMaster.\n' +
				'\n' +
				'Do you accept?');

		interaction.reply({content: 'Setup your bot,', embeds: [embed], components: [row]});
	}
};
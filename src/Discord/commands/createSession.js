const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_session')
		.setDescription('Create a RPG session'),

	async execute(interaction){
		await interaction.reply('creating....');
	}
};
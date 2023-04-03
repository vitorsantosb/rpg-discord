const { SlashCommandBuilder } = require('discord.js');
const {CreateSession, SessionExists} = require('../repositories/session.repository');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_session')
		.setDescription('Create a RPG session')
		.addStringOption(option => (
			option.setName('name')
				.setDescription('Name for your session')
				.setRequired(true)
		))
		.addIntegerOption(option => (
			option.setName('max_members_count')
				.setDescription('members count for your session - MAX: 5')
				.setRequired(false)
		)),

	async execute(interaction){
		const name = interaction.options.getString('name');

		if(await SessionExists(interaction, name)) {
			await interaction.reply(`Session with name "${name}" exists`);
			return;
		}

		await CreateSession(interaction);

		await interaction.reply(`Successfully created session "${name}"`);
	}
};
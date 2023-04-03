const { SlashCommandBuilder } = require('discord.js');
const {UpdateUserForGameMaster, FetchUserDataById} = require('../repositories/user.repository');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_gamemaster')
		.setDescription('setup game master with mention')
		.addMentionableOption(option=>(
			option.setName('user')
				.setDescription('Set one user for a rpg game master')
				.setRequired(true)
		))
		.addBooleanOption(option =>(
			option.setName('is_master')
				.setDescription('Enabled ?')
				.setRequired(true)
		)),


	execute: async function (interaction) {
		const {user} = interaction.options.getMentionable('user');
		const boolean = interaction.option.getBoolean('is_master');

		if (await FetchUserDataById(user.id)) {
			await UpdateUserForGameMaster(user.id, boolean);
			interaction.reply(`This user ${user.username + '#' + user.discriminator} now is new RPG master by ${interaction.user.username + '#' + interaction.user.discriminator}`);
			return;
		}

		await interaction.reply('Failure to set game master');
	}
};
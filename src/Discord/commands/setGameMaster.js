const { SlashCommandBuilder } = require('discord.js');
const user_repository = require('../repositories/user.repository');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_gamemaster')
		.setDescription('setup game master with mention')
		.addMentionableOption(option =>(
			option.setName('user')
				.setDescription('Set one user for a rpg game master')
				.setRequired(true)
                       
		)),

	async execute(interaction){
		const { user } = interaction.options.getMentionable('user');
		const isGameMaster = true;

		if(await user_repository.UpdateUserForGameMaster(user.id, isGameMaster)){
			interaction.reply(`This user ${user.username + '#' + user.discriminator} now is new RPG master by ${interaction.user.username + '#' + interaction.user.discriminator}`);
			return;
		}

        
		await interaction.reply('Failure to set game master');
	}
};
const {SlashCommandBuilder} = require('discord.js');
const {UserExistsById, DeleteUserById} = require('../../Discord/repositories/user.repository.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('delete user with mention')
		.addMentionableOption(option =>
			option.setName('user')
				.setDescription('The user you want to say hello to.')
				.setRequired(true)),

	async execute(interaction) {
		const {user} = interaction.options.getMentionable('user');


		if (await UserExistsById(user.id, {'guild.id': interaction.guild.id})) {
			await DeleteUserById(interaction.guild.id, user.id);

			interaction.reply(`User: ${user.username + '#' + user.discriminator} has been deleted by ${interaction.user.username + '#' + interaction.user.discriminator}!`);
			return;
		}

		interaction.reply('User not found');
	},
};

const { SlashCommandBuilder } = require('discord.js');
const {StoreUser, UserExistsById} = require('../../Discord/repositories/user.repository.js');


async function Register(user, guild) {
	const userInput = {
		user,
		guild,

		createdAt: Date(),
		updatedAt: null,
	};

	await StoreUser(userInput);

	return userInput;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('register your user and guild, this is necessary for create a rpg session'),

	async execute(interaction) {
		const { user, guild } = interaction;

		if (await UserExistsById(user.id)) {
			interaction.reply('Alredy Registered!');
			return;
		}

		await Register(user, guild);
		interaction.reply('Register Succesfully!');
	}
};
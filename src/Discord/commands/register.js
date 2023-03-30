const { SlashCommandBuilder, User, Guild, Client } = require('discord.js');
const db = require("../../lib/database/database.js");
const user_repository = require("../../Discord/repositories/user.repository.js");


async function Register(user, guild) {
	const rows = await db.GetDatabase();

	const user_input = {
		user,
		guild,

		createdAt: Date(),
		updatedAt: null,
	};

	await user_repository.AddNewUser(user_input, rows);

	return user_input;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('register your user and guild, this is necessary for create a rpg session'),

	async execute(interaction) {
		const { user, guild } = interaction;

		if (await user_repository.FetchUserDataById(user.id)) {
			interaction.reply("Alredy Registered!");
			return;
		}

		await Register(user, guild);
		interaction.reply("Register Succesfully!");

	},
};
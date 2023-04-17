const {SlashCommandBuilder} = require('discord.js');
const {StoreUser, UserExistsById} = require('../../Discord/repositories/user.repository.js');
const {AssignRoleToUser} = require('../repositories/roleManager.repository');
const {IsGuildSetupById} = require('../repositories/guild.repository');


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

// eslint-disable-next-line no-undef
module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('register your user and guild, this is necessary for create a rpg session'),

	async execute(interaction) {
		const {user, guild} = interaction;

		if (!await IsGuildSetupById(guild.id)) {
			return interaction.reply('You needed setup your guild for get a register');
		}

		if (await UserExistsById(user.id, {'guild.id': interaction.guild.id})) {
			return interaction.reply('Already Registered!');
		}

		await AssignRoleToUser(interaction, '[RPG-BOT] Player');
		await Register(user, guild);

		interaction.reply('You need setup your guild for get a  register');

	}
};
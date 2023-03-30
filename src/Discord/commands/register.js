const { SlashCommandBuilder, User, Guild, Client } = require('discord.js');
const fs = require('fs').promises;



async function Register(user, guild) {
	const db = GetDatabase();

	const user_input = {
		user,
		guild,

		createdAt: Date(),
		updatedAt: null,
	};

	AddNewUser(db, user_input);

	SaveDatabase(db);

	return user_input;
}

function GetDatabase() {
	const file_data = require("../../../data.json");
	const rows = JSON.parse(JSON.stringify(file_data));

	return rows;
}

function SaveDatabase(db) {
	fs.writeFile('data.json', JSON.stringify(db, null, 2))
}

async function FetchUserDataById(user_id) {
	const rows = GetDatabase();

	for (const row of rows) {
		if (row.user.id == user_id) {
			console.log("This user is alredy register!")
			return true;
		}
	}
}

function AddNewUser(db, user) {
	db.push(user);
	return db;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('register your user and guild, this is necessary for create a rpg session'),

	async execute(interaction) {
		const { user, guild } = interaction;

		if (await FetchUserDataById(user.id)) {
			interaction.reply("Alredy Registered!");
			return;
		}

		await Register(user, guild);
		interaction.reply("Register Succesfully!");

	},
};
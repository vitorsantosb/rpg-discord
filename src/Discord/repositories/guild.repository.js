const {GetDatabase} = require('../database/db');
const {CreateGuildData} = require('./dto/guild');


async function SetupGuildFromInteraction(interaction, extra){
	const {collections} = await GetDatabase();

	const guildData = {
		...CreateGuildData(interaction.guild),
		...extra
	};

	return collections.guilds.insertOne(
		JSON.parse(JSON.stringify(guildData))
	);
}

async function IsGuildSetupById(id){
	const {collections} = await GetDatabase();

	return collections.guilds.countDocuments({'guild.id': id}, {'_id' : 1});

}

module.exports = { SetupGuildFromInteraction, IsGuildSetupById };
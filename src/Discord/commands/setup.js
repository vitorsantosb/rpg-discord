const { SlashCommandBuilder, PermissionsBitField} = require('discord.js');
const {FetchRoleInGuild, CreateRole, AssignRoleToUser} = require('../repositories/roleManager.repository');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Receive a role for manager the bot - Obs: This function is enabled for server owner'),

	execute: async function(interaction){
		const { user, guild } = interaction;
		const role_name = 'RPG-Admin';
		const args = [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.KickMembers];

		if(guild.ownerId === user.id){
			if(await FetchRoleInGuild(guild, role_name)){
				interaction.reply(`You needed delete the role ${role_name}, for continue this command`);
				return;
			}
			await CreateRole(guild, role_name, args, '#1965E9');
			await AssignRoleToUser(interaction, role_name);

			interaction.reply(`Setup Complete. The server owner ${user.username} receive the role ${role_name}`);
			return;
		}
		interaction.reply('This command can only used by guild owner');
	}
};
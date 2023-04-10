/**
 *
 * @param guild - interaction.Guild
 * @param roleName the name of discord role
 * @param permissions
 * @param role_color
 * @returns {Promise<*>}
 * @constructor
 */
async function CreateRole(guild, roleName, permissions, role_color){
	return guild.roles.create({
		name: roleName,
		color: role_color,
		mentionable: true,
		permissions
	});

}

function ExistsRoleInGuild(guild, roleName){
	return !!guild.roles.cache.find(role => role.name === roleName);
}

function FetchRoleInGuild(interaction, roleName){
	return interaction.guild.roles.cache.find(({name}) => name === roleName);
}

async function AssignRoleToUser(interaction, roleName){
	const role = FetchRoleInGuild(interaction, roleName);

	const member = await interaction.guild.members.fetch(interaction.user.id);
	await member.roles.add(role.id);
}
async function RemoveUserRole(interaction, roleName){
	const role = FetchRoleInGuild(interaction, roleName);

	if (interaction.user && !interaction.user.roles.cache.has(role.id)) {
		await interaction.user.roles.remove(role.id);
	}
}

async function DeleteGuildRole(interaction, roleName){
	const role = FetchRoleInGuild(interaction, roleName);

	return interaction.guild.roles.delete(role.id);
}

module.exports = { CreateRole, ExistsRoleInGuild, AssignRoleToUser, RemoveUserRole, FetchRoleInGuild, DeleteGuildRole };
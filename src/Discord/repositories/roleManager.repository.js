/**
 *
 * @param guild - interaction.Guild
 * @param roleName the name of discord role
 * @param args
 * @param role_color
 * @returns {Promise<*>}
 * @constructor
 */
async function CreateRole(guild, roleName, args, role_color){
	return guild.roles.create({
		name: roleName,
		color: role_color,
		mentionable: true,
		permissions: args
	});

}

async function FetchRoleInGuild(guild, roleName){
	return !!guild.roles.cache.find(role => role.name === roleName);
}

async function AssignRoleToUser(interaction, roleName){
	const role_ = interaction.guild.roles.cache.find(role => role.name === roleName).id;
	const member = await interaction.guild.members.fetch(interaction.user.id);
	await member.roles.add(role_);
}
async function RemoveUserRole(interaction, roleName){
	const role_ = interaction.guild.roles.cache.find(role => role.name === roleName).id;

	if(interaction.user && !interaction.user.roles.cache.has(role_)){
		await interaction.user.roles.remove(role_);
	}
}


module.exports = { CreateRole, FetchRoleInGuild, AssignRoleToUser, RemoveUserRole };
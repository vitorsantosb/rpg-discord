const {GetDatabase} = require('../database/db');

/**
 *
 * @param guild - interaction.Guild
 * @param roleName the name of discord role
 * @param permissions
 * @param role_color
 * @returns {Promise<*>}
 * @constructor
 */
async function CreateRole(guild, roleName, permissions, role_color) {
	return guild.roles.create({
		name: roleName,
		color: role_color,
		mentionable: true,
		permissions
	});
}

function ExistsRoleInGuild(guild, roleName) {
	return !!guild.roles.cache.find(role => role.name === roleName);
}

function FetchRoleInGuild(guild, roleName) {
	return guild.roles.cache.find(({name}) => name === roleName);
}

async function AssignRoleToUser(guild, user, roleName) {
	const role = FetchRoleInGuild(guild, roleName);

	const member = await guild.members.fetch(user.id);
	await member.roles.add(role.id);
}

//Needed hotfix
async function RemoveUserRole(guild, user, roleName) {
	const role = FetchRoleInGuild(guild, roleName);
	const member = await guild.members.fetch(user.id);

	if (member.roles.cache.some(role => role.name === roleName)) {
		member.roles.remove(role.id);
	}
}

async function ExistsRoleInUser(guild, user, roleName) {
	const member = await guild.members.fetch(user.id);

	return member.roles.cache.some(role => role.name === roleName);
}

async function DeleteGuildRole(guild, roleName) {
	const role = FetchRoleInGuild(guild, roleName);

	return guild.roles.delete(role.id);
}

async function GetArrayOfBotRolesInGuild(guildId) {
	const {collections} = await GetDatabase();

	return collections.guilds.find({
		'botRolesIds.role.guildId': guildId,
	}).toArray();
}

module.exports = {
	CreateRole,
	ExistsRoleInGuild,
	AssignRoleToUser,
	RemoveUserRole,
	FetchRoleInGuild,
	DeleteGuildRole,
	GetArrayOfBotRolesInGuild,
	ExistsRoleInUser
};
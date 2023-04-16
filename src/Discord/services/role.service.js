const roleConfig = require('../config/roles');

function GetRoles () {
	return roleConfig.roles;
}

function GetRolesName () {
	return GetRoles().map(({name}) => name);
}

module.exports = { GetRoles, GetRolesName };
const admin = require('./admin');
const gameMaster = require('./gameMaster');
const player = require('./player');

module.exports = {
	roles: [
		admin,
		gameMaster,
		player,
	],
};

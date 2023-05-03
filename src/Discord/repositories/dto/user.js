function CreateUserData (user, guild) {
	return {
		user: {
			id: user.id,
			username: user.username,
			discriminator: user.discriminator,
			avatarURL: user.avatarURL,
		},
		guild: {
			id: guild.id,
			name: guild.name,
		}
	};
}

module.exports = { CreateUserData };
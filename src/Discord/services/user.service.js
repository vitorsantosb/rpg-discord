function GetFullUsername(user){
	return user.username + '#' + user.discriminator;
}

module.exports = { GetFullUsername };
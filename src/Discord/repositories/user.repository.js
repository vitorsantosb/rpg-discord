const { GetDatabase } = require('../database/db');

async function DeleteUserById(userId) {
	const {collections} = await GetDatabase();

	return collections.users.remove({'user.id': userId});
}

async function UserExistsById(userId) {
	const {collections} = await GetDatabase();

	return collections.users.countDocuments({'user.id': userId}, {'_id' : 1});
}

async function FetchUserDataById(userId) {
	const {collections} = await GetDatabase();

	return collections.users.findOne({'user.id': userId});
}

async function StoreUser(user) {
	const {collections} = await GetDatabase();

	return collections.users.insertOne(
		JSON.parse(JSON.stringify(user))
	);
}
async function UpdateUserForGameMaster(user_id, isEnable){
	const {collections} = await GetDatabase();

	return collections.users.updateOne({'user.id': user_id}, {
		$set:{
			'isGameMaster': isEnable
		}
	});
}

async function SaveDiceHistory(userId, diceRoll) {
	const {collections} = await GetDatabase();

	return collections.users.updateOne({'user.id': userId}, {
		$push: {
			'rolls': {
				$each: [diceRoll], 
				$slice: -10
			}
		}
	});
}

// eslint-disable-next-line no-undef
module.exports = {
	DeleteUserById, FetchUserDataById, StoreUser, UserExistsById,
	SaveDiceHistory, UpdateUserForGameMaster
};
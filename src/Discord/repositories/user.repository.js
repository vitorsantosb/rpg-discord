const { GetDatabase } = require('../database/db');

/**
 *
 * @param userId
 * @param filter
 * @returns {Promise<DeleteResult>}
 * @constructor
 */
async function DeleteUserById(userId, filter={}) {
	const {collections} = await GetDatabase();

	return collections.users.deleteOne({
		'user.id': userId,
		...filter
	});
}

/**
 *
 * @param userId
 * @param filter filter options
 * @returns {Promise<number>}
 * @constructor
 */
async function UserExistsById(userId, filter={}) {
	const {collections} = await GetDatabase();

	return collections.users.countDocuments({'user.id': userId, ...filter}, {'_id' : 1});
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
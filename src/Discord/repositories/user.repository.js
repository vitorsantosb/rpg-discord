const db = require("../../lib/database/database.js");


async function DeleteUserById(user_id) {
    let rows = await db.GetDatabase();

    const user_index = rows.findIndex(row => row.user.id == user_id);

    if (user_index > -1) {
        rows.splice(user_index, 1);
    }

    await db.SaveDatabase(rows);

}

async function FetchUserDataById(user_id) {
    const rows = await db.GetDatabase();

    for (const row of rows) {
        if (row.user.id == user_id) {
            return true;
        }
    }

    return false;
}

async function AddNewUser(user, rows) {

    rows.push(user);

    await db.SaveDatabase(rows);
}

module.exports = { DeleteUserById, FetchUserDataById, AddNewUser }
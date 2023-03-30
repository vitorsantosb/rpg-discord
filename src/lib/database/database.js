const fs = require('fs').promises;
const path = require("path");

const database_file_path = path.resolve(__dirname, "../../../data.json");


/**
 * @returns {array}
 */
async function GetDatabase() {
    const file_data = await fs.readFile(database_file_path);
    const rows = JSON.parse(file_data);

    return rows;
}

async function SaveDatabase(db) {
   
    return fs.writeFile(database_file_path, JSON.stringify(db, null, 2));
}

module.exports = { GetDatabase, SaveDatabase };
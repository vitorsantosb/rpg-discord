const sequelize = require("sequelize");
const db = require("../database/database.js");

var guild = db.define(
    "guild",
    {
        guild_id: { type: sequelize.INTEGER, primaryKey: true },
        guild_name: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: true,
    }
);
module.exports = user;
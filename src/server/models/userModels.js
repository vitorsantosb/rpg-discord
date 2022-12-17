const sequelize = require("sequelize");
const db = require("../database/database.js");

var user = db.define(
    "user",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        username: { type: sequelize.STRING },
        discord_token: {type: sequelize.STRING},
        token: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = user;
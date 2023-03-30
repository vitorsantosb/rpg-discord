const sequelize = require("sequelize");
const db = require("../database/database.js");

var Administrador = db.define(
    "Administrador",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        username: { type: sequelize.STRING },
        password: {type: sequelize.STRING},
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: true,
    }
);
module.exports = user;
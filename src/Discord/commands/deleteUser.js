const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;

function GetDatabase() {
    const file_data = require("../../../data.json");
    const rows = JSON.parse(JSON.stringify(file_data));

    return rows;
}

function SaveDatabase(db) {
    fs.writeFile('data.json', JSON.stringify(db, null, 2));
}

async function DeleteUserDataById(user_id) {
    const rows = GetDatabase();

    for(let i = 0; i < rows.lenght; i++){
        if(rows[i].user.id == user_id){
            rows[i].splice(i, 1);
        }
    }

    SaveDatabase(rows);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('delete user with metion')
        .addMentionableOption(option => 
            option.setName('user')
              .setDescription('The user you want to say hello to.')
              .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getMentionable('user');
        const user_id = user.id;

        await DeleteUserDataById(user_id);
        interaction.reply(`User: ${user.username} has been deleted by ${interaction.user.username}!`);

    },
};

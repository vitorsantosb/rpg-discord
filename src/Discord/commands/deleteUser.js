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

async function FetchUserDataById(user_id) {
	const rows = GetDatabase();

	for (const row of rows) {
		if (row.user.id == user_id) {
			console.log("User Found!")
			return true;
		}
	}
}

async function DeleteUserById(user_id) {
    let rows = GetDatabase();
    console.log("teste");
    for(let index = 0; index <= rows.lenght; index++){
       
        if(rows[index].user.id == user_id){
            rows = rows.splice(index, 1);
            console.log(rows);
            
            SaveDatabase(rows);
        }
    }

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
        
        if(FetchUserDataById(user_id)){
            await DeleteUserById(user_id);
            interaction.reply(`User: ${user.username + "#" + user.discriminator} has been deleted by ${interaction.user.username + "#" + interaction.user.discriminator}!`);
            return;
        }
        interaction.reply('User not found');

    },
};

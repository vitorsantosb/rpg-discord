const { SlashCommandBuilder } = require('discord.js');
const db = require("../../lib/database/database.js");
const user_repository = require("../../Discord/repositories/user.repository.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('delete user with metion')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user you want to say hello to.')
                .setRequired(true)),

    async execute(interaction) {
        const { user } = interaction.options.getMentionable('user');
        

        if(await user_repository.FetchUserDataById(user.id)){
            
            await user_repository.DeleteUserById(user.id);

            interaction.reply(`User: ${user.username + "#" + user.discriminator} has been deleted by ${interaction.user.username + "#" + interaction.user.discriminator}!`);
            return;
        }
        interaction.reply('User not found');

    },
};

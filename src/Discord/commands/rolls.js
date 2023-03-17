const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolagem de dados!')
        .addStringOption(option =>
            option.setName('dices')
                .setRequired(true)
                .setDescription('Select the dice')
                .addChoices(
                    { name: 'd20', value: '20' },
                    { name: 'd12', value: '12' },
                    { name: 'd10', value: '10' },
                    { name: 'd6', value: '6' },
                    { name: 'd4', value: '4' },
                ))
        .addNumberOption(numberOption => 
            numberOption.setName('increment')
            .setRequired(false)
            .setDescription('Increment value for you dice')),
        
    async execute(interaction) {
        const dice = interaction.options.getString('dices');
        const increment = interaction.options.getString('increment');
        
        const result = Math.floor(Math.random(dice) + 1);

        if(increment >= 0){
            result += increment;
        }
        await interaction.reply(result);
    },
}
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
        .addIntegerOption(option => option.setName('modifier').setDescription('Add modifier for your dice!').setRequired(false))
        .addIntegerOption(option => option.setName('rolls').setDescription('Number of rolls for your dice. Ex: 2d20, 2d10').setRequired(false))
        .addIntegerOption(option => option.setName('min_value').setDescription('Minimal value for get a sucess in your dice!').setRequired(false)),

    async execute(interaction) {

        const dice = interaction.options.getString('dices');
        const modifier = interaction.options.getInteger('modifier');
        const rolls = interaction.options.getInteger('rolls');
        const minValue = interaction.options.getInteger('min_value');

        let results = [];

        if (rolls == 0) {
            rolls = 1;
        }

        for (let i = 0; i <= rolls; i++) {
            let result = Math.floor(Math.random() * dice + 1);

            if (modifier > 0) result += modifier;

            if (minValue != null) {
                if (result >= minValue) {
                    results.push(" | " + result + " | ")
                }
            } else {
                results.push(" | " + result + " | ")
            }
        }
        await interaction.reply("Dice result: " + results);
    },
}

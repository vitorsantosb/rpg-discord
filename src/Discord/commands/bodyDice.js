const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bodydice')
        .setDescription('Randomizer a body part')
        .addIntegerOption(option => option.setName("rolls").setDescription('Number of rolls for your dice!').setRequired(false)),

	async execute(interaction) {
	    const rolls = interaction.options.getInteger('rolls');
        let result = [];
        
        let humamParts = ["Left Arm", "Right Arm", "Left Leg", "Right Leg", "Spine", "Head", "Thorax"];
        
        for(let i = 0; i <= rolls; i++){
            result.push(" | " + humamParts[Math.floor(Math.random() * humamParts.length)] + " | ");
        }
        await interaction.reply("HIT: " + result);
	},
};
const { SlashCommandBuilder } = require('discord.js');
const {SaveDiceHistory} = require('../repositories/user.repository');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bodydice')
		.setDescription('Randomizer a body part')
		.addIntegerOption(option => option.setName('rolls').setDescription('Number of rolls for your dice!').setRequired(false)),

	async execute(interaction) {
	    const rollCount = interaction.options.getInteger('rolls');
		const rolls = [];
		const humamParts = ['Left Arm', 'Right Arm', 'Left Leg', 'Right Leg', 'Spine', 'Head', 'Thorax'];
        
		for(let i = 0; i <= rollCount; i++){
			const randomBodyPartIndex = Math.floor(Math.random() * humamParts.length);
			const randomBodyPart = humamParts[randomBodyPartIndex];

			rolls.push(randomBodyPart);
		}

		const rollAsText = rolls.join(' | ');

		await SaveDiceHistory(interaction.user.id, {
			type: 'body_dice', size: humamParts.length,
			rolls, rollAsText
		});

		await interaction.reply('HIT: ' + rollAsText);
	},
};
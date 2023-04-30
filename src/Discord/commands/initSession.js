const {SlashCommandBuilder, ChannelType} = require('discord.js');
const {SessionExists, GetSessionMembers} = require('../repositories/session.repository');
const {CreateRoleWithSessionName, AssignRoleToUserWithId} = require('../repositories/roleManager.repository');
const {
	CreateSessionCategory,
	CreateSessionTextChannel,
	CreateSessionVoiceChannel
} = require('../repositories/channel.repository');
const {CreateSessionName, GetSessionChannels} = require('../services/channel.service');
const {SetupArrayOfPermissionsOverwrites} = require('../config/channels');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init_session')
		.setDescription('initialize your session')
		.addStringOption(option => (
			option
				.setName('session')
				.setDescription('session name for user entry')
				.setRequired(true)
		))
		.addMentionableOption(option => (
			option
				.setName('everyone')
				.setDescription('@everyone role')
				.setRequired(true)
		)),

	async execute(interaction) {
		const {guild, options} = interaction;
		interaction.deferReply();

		const roles = [];
		const sessionChannels = GetSessionChannels();
		const sessionName = options.getString('session');
		const everyone = options.getMentionable('everyone');

		roles.push(everyone);

		if (await SessionExists(interaction, sessionName)) {
			const sessionRole = await CreateRoleWithSessionName(guild, sessionName);
			roles.push(sessionRole);

			//Criar categoria
			const category = await CreateSessionCategory(guild, CreateSessionName(sessionName), roles);

			//Cria canais de texto e voz.
			const permissionsOverwrites = SetupArrayOfPermissionsOverwrites(roles);

			for (const channel of sessionChannels) {
				if (channel.type === ChannelType.GuildText) {
					await CreateSessionTextChannel(guild, channel.name, permissionsOverwrites, category.id);
				}
				if (channel.type === ChannelType.GuildVoice) {
					await CreateSessionVoiceChannel(guild, channel.name, permissionsOverwrites, category.id);
				}
				//adicionar em um objeto todas as informações criadas.
			}

			const session = await GetSessionMembers(guild.id, sessionName);

			//Anexar a role criada aos membros da sessão.
			for (const member of session.members) {
				await AssignRoleToUserWithId(guild, member.user, sessionRole.id);
			}

			return interaction.editReply({content: 'Categoria para jogo criada com sucesso!'});
		}
		return interaction.editReply({content: 'Falha na criação da sessão!'});
	}
};
const {SlashCommandBuilder, ChannelType} = require('discord.js');
const {
	SessionExists,
	GetSessionMembers,
	UpdateSessionChannelsData,
	UpdateSessionRole,
	UpdateMemberRoleInSession, UpdateInitializedStatus, CheckSessionInitializedStatus
} = require('../repositories/session.repository');
const {
	CreateRoleWithSessionName,
	AssignRoleToUserWithId,
	ExistsRoleInGuild,
	DeleteGuildRole
} = require('../repositories/roleManager.repository');
const {
	CreateSessionCategory,
	CreateSessionTextChannel,
	CreateSessionVoiceChannel
} = require('../repositories/channel.repository');
const {
	CreateSessionName,
	GetSessionChannels,
	GetSessionRoleNameWithSessionName
} = require('../services/channel.service');
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
		const {guild} = interaction;

		const roles = [];
		const channelsMap = [];

		const sessionChannels = GetSessionChannels();
		const sessionName = interaction.options.getString('session');
		const everyone = interaction.options.getMentionable('everyone');

		roles.push(everyone);

		if (await SessionExists(interaction, sessionName)) {
			if (await CheckSessionInitializedStatus(sessionName, guild.id)) {
				return interaction.reply({content: 'This session has been initialized', ephemeral: true});
			}

			interaction.deferReply();

			if (ExistsRoleInGuild(guild, GetSessionRoleNameWithSessionName(sessionName))) {
				await DeleteGuildRole(guild, GetSessionRoleNameWithSessionName(sessionName));
			}

			const sessionRole = await CreateRoleWithSessionName(guild, sessionName);
			await UpdateSessionRole(guild.id, sessionName, {
				id: sessionRole.id,
				name: sessionRole.name,
				guild: guild.id,
			});

			roles.push(sessionRole);

			const category = await CreateSessionCategory(guild, CreateSessionName(sessionName), roles);
			channelsMap.push({
				id: category.id,
				type: ChannelType.GuildCategory,
				name: category.name,
				guild: guild.id,
			});

			const permissionsOverwrites = SetupArrayOfPermissionsOverwrites(roles);

			try {

				for (const channel of sessionChannels) {
					if (channel.type === ChannelType.GuildText) {
						let createdChannel = await CreateSessionTextChannel(guild, channel.name, permissionsOverwrites, category.id);
						channelsMap.push({
							id: createdChannel.id,
							type: channel.type,
							name: createdChannel.name,
							guild: guild.id,
						});
					}
					if (channel.type === ChannelType.GuildVoice) {
						let createdChannel = await CreateSessionVoiceChannel(guild, channel.name, permissionsOverwrites, category.id);
						channelsMap.push({
							id: createdChannel.id,
							type: channel.type,
							name: createdChannel.name,
							guild: guild.id,
						});
					}
				}
				await UpdateSessionChannelsData(guild.id, sessionName, channelsMap);
			} catch (err) {
				console.log(err);
				return interaction.reply(err);
			}

			const session = await GetSessionMembers(guild.id, sessionName);

			if (session?.members) {
				for (const member of session.members) {
					await AssignRoleToUserWithId(guild, member.user, sessionRole.id);
					await UpdateMemberRoleInSession(guild.id, sessionName, member.user.id, sessionRole.id);
				}
				await UpdateInitializedStatus(sessionName, guild.id, true);

				return interaction.editReply({content: 'Categoria para jogo criada com sucesso! Cargos foram anexados com sucesso!'});
			}
			await UpdateInitializedStatus(sessionName, guild.id, true);

			return interaction.editReply({content: 'Categoria para jogo criada com sucesso! Adicione seus jogadores a sessão para começar a jogar!'});
		}
		return interaction.editReply({content: 'Falha na criação da sessão!'});
	}
};
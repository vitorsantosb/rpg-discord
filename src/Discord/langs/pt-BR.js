const {GetFullUsername} = require('../services/user.service');
module.exports ={
	lang: 'pt-BR',
	commands: {
		setup: {
			name: 'setup',
			description: 'Configura o bot no seu servidor',

			labels:{
				command_setup_cancel: 'Cancelar',
				command_setup_accept: 'Aceitar'
			},
			warning:{
				title: 'Cuidado!!!',
				description: (roles) => `Este comando necessita de alguns nomes de cargo especificos, caso eles existam serão deletados.\n São elas: ${roles} \n Você Aceita ?`,
			},
			reply: 'Configure seu bot',
			setupEvent:{
				isSetup: 'Este servidor já foi configurado!',
				setup_complete_reply: (userName, ownerRoleName) => `Configuração Finalizada!!. O dono do servidor ${userName} recebeu o cargo ${ownerRoleName} Bom jogo!!`,
				cancel_setup: 'Processo não permitido'
			}
		},
		register: {
			name: 'register',
			description: 'Registre como membro da sua guild para poder participar das sessões!',

			register_reply: {
				registered: 'Você já está cadastrado!',
				success: 'Registro feito com Sucesso!',
			}
		},
		bodydice: {
			name: 'bodydice',
			description: 'Randomize uma parte do corpo',

			bodyParts: [
				'Braço Esquerdo',
				'Braço Direito',
				'Perna Esquerda',
				'Perna Direita',
				'Coluna',
				'Cabeça',
				'Thorax'
			],
			reply: 'ACERTO: '
		},
		rolls: {
			name: 'roll',
			description: 'Rolagem de Dados',

			option: {
				description: 'Selecione um dado',
				modifier: 'Adicione um modificador ao seu dado!',
				rolls: 'Numero de rolagens para os dados. Ex: 2d20, 2d10',
				min_value: 'Valor minimo para garantir um sucesso!'
			},
			reply: 'Resultado dos Dados: '
		},
		setGameMaster: {
			name: 'set_gamemaster',
			description: 'Coloque um membro como Game Master por mention',

			option:{
				mentionable: {
					description: 'Mencione um membro para ser Game Master'
				},
				boolean: {
					description: 'É um mestrante ?'
				},
			},
			reply: {
				game_master_complete: (userName, interaction) => `O membro ${userName} recebeu o cargo de GameMaster por: ${interaction.user.username + '#' + interaction.user.discriminator}`,
			}
		},
		addSessionMember: {
			name: 'add_session_member',
			description: 'Adiciona um membro a uma sessão por mensão',

			option:{
				mentionable: {
					description: 'Membro para adicionar a sessão'
				},
				boolean: {
					description: 'Nome da sessão'
				},
			},
			reply_message: (userName, sessionName, interactionUser) => `Novo membro ${userName} foi adicionado a sessão ${sessionName} pelo GameMaster ${interactionUser}`,
			reply_fail: 'Sessão não existe',
		}
	}
};
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
				setup_complete_reply: (user, ownerRoleName) => `Configuração Finalizada!!. O dono do servidor ${user.username} recebeu o cargo ${ownerRoleName} Bom jogo!!`,
				cancel_setup: 'Processo não permitido'
			}
		},
	}
};
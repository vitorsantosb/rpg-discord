module.exports = {
	lang: 'en-US',
	commands: {
		setup: {
			name: 'setup',
			description: 'Config the bot in your server - Obs: This function is enabled  for owner server!',

			labels: {
				command_setup_cancel: 'Cancel',
				command_setup_accept: 'Agree'
			},
			warning: {
				title: 'WARNING',
				description: (roles) => `This command requires a set of role names.\n They are: ${roles} \n Do you Accept ?`,
			},
			reply: 'Setup your bot',
			setupEvent: {
				isSetup: 'Guild is already setup!',
				setup_complete_reply: (userName, ownerRoleName) => `Setup Complete!!. The server owner ${userName} receive the role "${ownerRoleName}". Good Game!!`,
				cancel_setup: 'Operation canceled'
			}
		},
		register: {
			name: 'register',
			description: 'register your user in guild, this is necessary for create a rpg session',

			register_reply: {
				registered: 'Already Registered!',
				success: 'Register  Successfully!',
			}
		},
		bodydice: {
			name: 'bodydice',
			description: 'Randomizer a body part',

			bodyParts: [
				'Left Arm',
				'Right Arm',
				'Left Leg',
				'Right Leg',
				'Spine',
				'Head',
				'Thorax'
			],
			reply: 'HIT: '
		},
		rolls: {
			name: 'roll',
			description: 'Dice Rolls',

			option: {
				description: 'Select the dice',
				modifier: 'Add modifier for your dice!',
				rolls: 'Number of rolls for your dice. Ex: 2d20, 2d10',
				min_value: 'Minimal value for get a success in your dice!'
			},
			reply: 'Dice result: '
		},
		setGameMaster: {
			name: 'set_gamemaster',
			description: 'setup game master with mention',

			option:{
				mentionable: {
					description: 'Set one user for a rpg game master'
				},
				boolean: {
					description: 'is GameMaster ?'
				},
			},
			reply: {
				game_master_complete: (userName, interactionUser) => `This user ${userName} now is new RPG master by ${interactionUser}`,
			}
		},
		addSessionMember: {
			name: 'add_session_member',
			description: 'Add one user in session with mention',

			option:{
				mentionable: {
					description: 'member for add in session'
				},
				boolean: {
					description: 'Session name'
				},
			},
			reply_message: (userName, sessionName, interactionUser) => `New member ${userName} added on session ${sessionName} by GameMaster ${interactionUser}`,
			reply_fail: 'Session does not exists',
		}

	}
};
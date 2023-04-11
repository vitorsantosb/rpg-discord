module.exports ={
	lang: "en-US",
	commands: {
		setup: {
			"name": "Setup",
			"description": "Config the bot in your server - Obs: This function is enabled  for owner server!",

			labels:{
				command_setup_cancel: "Cancel",
				command_setup_accept: "Agree"
			},
			warning:{
				title: "WARNING",
				description: (roles) => `This command requires a set of role names.\n They are: ${roles} \n Do you Accept ?`,
			},
			reply: "Setup your bot",
			setupEvent:{
				isSetup: "Guild is already setup!",
				setup_complete_reply: (user, ownerRoleName) => `Setup Complete!!. The server owner ${user.username} receive the role ${ownerRoleName} Good Game!!`,
				cancel_setup: "Operation canceled"
			}

		},
	}
}
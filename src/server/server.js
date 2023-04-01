const http = require("http");
const app = require("../server/database/database.js");
require("dotenv").config();

const port = process.env.SERVER_PORT || 8000;
const server = http.createServer(app);

async function initDiscordServer () {
	server.listen(port, () => {
		console.log(`server running in port ${port}`);
	});
}

module.exports = { initDiscordServer };

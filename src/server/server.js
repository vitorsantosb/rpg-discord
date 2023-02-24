const http = require("http");
const app = require("../server/database/database.js");
require("dotenv").config();

const port = process.env.SERVER_PORT || 50;
const server = http.createServer(app);


async function init_routes(){

    server.listen(port, () => {
        console.log(`server running in port ${port}`);
    });
}

module.exports = { init_routes };

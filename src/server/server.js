const http = require("http");
const app = require("../routes/app");

const port = 3000;
const server = http.createServer(app);


async function init_routes(){

    server.listen(port, () => {
        console.log(`server running in port ${port}`);
    });
}

module.exports = { init_routes };

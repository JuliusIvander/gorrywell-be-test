const http = require('http');

/** Connecting DB */
require('./db/index');

const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const server = require('./server');

const port = process.env.PORT || 5000;

server.createServer(port).start((err) => {
  if (err) {
    throw new Error(err);
  }

  return `server is running at http://localhost:${port}/`;
});

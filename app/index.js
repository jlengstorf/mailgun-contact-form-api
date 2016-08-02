'use strict';

const server = require('./server');
const port = process.env.PORT || 5000;

server.createServer(port).start(err => {
  if (err) {
    console.log(err);
  }

  console.log(`server is running at http://localhost:${port}/`);
});

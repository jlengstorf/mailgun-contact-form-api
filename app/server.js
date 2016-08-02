'use strict';

/*
 * Hapi is a very simple way to build REST APIs.
 */
const Hapi = require('hapi');

function createServer(port) {
  const server = new Hapi.Server();

  server.connection({ port });

  server.register([
    {
      register: require('./routes/status'),
      routes: {
        prefix: '/status',
      },
    },
    {
      register: require('./routes/submit'),
      routes: {
        prefix: '/submit',
      },
    },
  ]);

  return server;
}

module.exports = {
  createServer,
};

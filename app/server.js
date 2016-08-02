'use strict';

/*
 * Hapi is a very simple way to build REST APIs.
 */
const Hapi = require('hapi');

/**
 * Creates a Hapi server that’s ready to start.
 * @param  {number} port the port for the API to connect on (default `5000`)
 * @return {Server}      an instance of hapi’s `Server`
 */
function createServer(port) {
  const server = new Hapi.Server();

  server.connection({ port });

  // Register each of the routes as a plugin & set the prefix for the endpoint.
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

'use strict';

exports.register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Running!');
    },
  });

  next();

};

exports.register.attributes = {
  name: 'status',
  version: '0.0.1',
};

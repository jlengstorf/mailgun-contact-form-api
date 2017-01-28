exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply({
        statusCode: 200,
        message: 'API is running.',
      });
    },
  });

  next();
};

exports.register.attributes = {
  name: 'status',
  version: '0.0.1',
};

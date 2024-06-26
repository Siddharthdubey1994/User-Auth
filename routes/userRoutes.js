const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/auth');
const { HTTP_BAD_REQUEST,MSG_SERVER_ERROR } = require('../constants/httpStatus');
const { validateUserInput } = require('../helpers/validationHelper');


async function userRoutes(fastify, opts) {
  // Register route without authentication middleware
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body;
    try {
      // Validate input
      validateUserInput(username, password);

      await userController.registerUser(request, reply);
    } catch (err) {
      reply.status(HTTP_BAD_REQUEST).send({ msg: err.message });
    }
  });

  // Login route with authentication middleware
  fastify.post('/login', { preHandler: authMiddleware }, userController.loginUser);

  // Error handling
  fastify.setErrorHandler((error, request, reply) => {
    if (error.statusCode) {
      reply.status(error.statusCode).send({ msg: error.message });
    } else {
      reply.status(HTTP_BAD_REQUEST).send({ msg: MSG_SERVER_ERROR });
    }
  });
}

module.exports = userRoutes;

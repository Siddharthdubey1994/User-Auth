const userService = require('../service/userService')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {
  HTTP_CREATED,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  MSG_USERNAME_EXISTS,
  MSG_SERVER_ERROR,
  TOKEN_DURATION,
  USER_REGISTERED,
} = require('../constants/httpStatus');

async function registerUser(request, reply) {
  const { username, password } = request.body;

  try {
    
    const user = await userService.register(username, password);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_DURATION });

    reply.code(HTTP_CREATED).send({ msg:USER_REGISTERED ,token });
  } catch (err) {
    if (err.message === MSG_USERNAME_EXISTS) {
      reply.status(HTTP_BAD_REQUEST).send({ msg: err.message });
    } else {
      reply.status(HTTP_INTERNAL_SERVER_ERROR).send({ msg: MSG_SERVER_ERROR });
    }
  }
}

async function loginUser(request, reply) {
  const { username, password } = request.body;
  try {
    const user = await userService.login(username, password);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_DURATION });

    reply.send({ token });
  } catch (err) {
    reply.status(HTTP_BAD_REQUEST).send({ msg: err.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
};

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { MSG_TOKEN_MISSING,HTTP_UNAUTHORIZED,MSG_TOKEN_INVALID } = require('../constants/httpStatus')

async function authenticate(request, reply, done) {
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    return reply.status(HTTP_UNAUTHORIZED).send({ msg: MSG_TOKEN_MISSING });
  }

try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    request.user = decoded;
    done();
  } catch (err) {
    reply.status(HTTP_UNAUTHORIZED).send({ msg: MSG_TOKEN_INVALID });
  }
}

module.exports = authenticate;

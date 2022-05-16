const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-secret-strong-web-code');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация2');
  }

  req.user = payload;

  return next();
};

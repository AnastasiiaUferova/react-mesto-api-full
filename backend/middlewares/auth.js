const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/unauthorized-401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, { expiresIn: '7d' }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret');
  } catch (err) {
    throw new UnauthorizedError('Authorization required');
  }

  req.user = payload; // adding the payload to the request object

  return next();
};

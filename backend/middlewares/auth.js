const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/unauthorized-401');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret');
  } catch (err) {
    console.log(err)
    throw new UnauthorizedError('Необходима авторизация2');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next();
};

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getAllUsers, changeUserInfo, changeUserAvatar, getCurrentUser,
} = require('../controllers/users');

const { linkPattern } = require('../utils/constants');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkPattern),
  }),
}), changeUserAvatar);

module.exports = router;

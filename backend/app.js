const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-404');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'https://mesto-front.u.nomoredomains.xyz/',
  'http://mesto-front.u.nomoredomains.xyz/',
  'https://mesto-front.u.nomoredomains.xyz/',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://mesto-back.u.nomoredomains.xyz',
  'https://mesto-back.u.nomoredomains.xyz',
  'https://mesto-back.u.nomoredomains.xyz/'
];


const corsOptions = {
  origin: allowedCors,
  credentials: true,
};
app.use('*', cors(corsOptions));

app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb');


app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/signout', (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Выход' });
});

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
})

app.use(errors());

app.use(errorHandler);

app.listen(PORT);

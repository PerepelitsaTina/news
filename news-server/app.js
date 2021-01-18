const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { strategy } = require('./utils/jwt');


const newsRouter = require('./routes/news');
const userRouter = require('./routes/users');

const app = express();

app.use(passport.initialize())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
passport.use(strategy);

app.use('/news', newsRouter);
app.use('/users', userRouter);

module.exports = app;

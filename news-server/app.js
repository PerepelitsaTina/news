const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport');
const { strategy } = require('./utils/jwt');

const newsRouter = require('./routes/news');
const userRouter = require('./routes/users');
const likesRouter = require('./routes/likes');
const auth = passport.authenticate('jwt', {session: false});

const app = express();

passport.use(strategy);
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/news', newsRouter);
app.use('/users', userRouter);
app.use('/likes', likesRouter);

module.exports = app;

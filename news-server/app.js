const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const newsRouter = require('./routes/news');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/news', newsRouter);

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./routes/auth');
const workerRouter = require('./routes/worker');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('./routes/jwt')();

mongoose.connect(config.dataBaseUrl , { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.options("*", cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//CORS Middleware



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/workers', workerRouter);


app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

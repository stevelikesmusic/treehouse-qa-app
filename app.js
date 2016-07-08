'use strict'

const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');

// Middleware modules
const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/qa');
const db = mongoose.connection;

db.on('error', (err) => console.log(`connection errror: ${err}`));
db.once('open', () => console.log(`db connection successful`));

app.use('/questions', routes);

app.use((req, res, next) => {
  console.log('In the error creator')
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log('In the error handler')
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
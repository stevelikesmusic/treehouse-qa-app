'use strict'

const express = require('express');
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();

// Middleware modules
const jsonParser = require('body-parser').json;
const logger = require('morgan');

//app.use('/', express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(jsonParser());

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/qa');
const db = mongoose.connection;

db.on('error', (err) => console.log(`connection errror: ${err}`));
db.once('open', () => console.log(`db connection successful`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Header-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/questions', routes);

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
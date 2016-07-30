'use strict'

const express = require('express');
const path = require('path');
const router = require('./routes');
const mongoose = require('mongoose');
const app = express();

// Middleware modules
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const compression = require('compression');

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../public')));
}

app.use(logger('dev'));
app.use(jsonParser());

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/qa');
const db = mongoose.connection;

db.on('error', (err) => console.log(`connection errror: ${err}`));
db.once('open', () => console.log(`db connection successful`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Headers, Body');
  if (req.method === 'OPTIONS' && process.env.NODE_ENV === 'production') {
    res.header('Access-Control-Header-Methods', 'PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, OPTIONS');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/questions', router);

if (process.env.NODE_ENV === 'production') {
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
  })
}

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
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
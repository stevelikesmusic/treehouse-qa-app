'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./models').Question;

const mongoose = require('mongoose');
mongoose.Promise = Promise;

router.param('qId', (req, res, next, id) => {
  Question.findById(req.params.qId).exec()
    .catch(err => next(err))
    .then(doc => {
      if (!doc) {
        let err = new Error('Not Found');
        err.status = 404;
        return next(err);
      }
      req.question = doc;
      next();
    });
});

router.param('aId', (req, res, next, id) => {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
  next();
});

// GET /questions
// Route for collection of questions
router.get('/', (req, res) => {
  Question.find({})
      .sort({createdAt: -1})
      .exec((err, questions) => {
        if (err) return next(err);
        res.json(questions);
      });
});

// POST /questions
// Route for creating questions
router.post('/', (req, res, next) => {
  let question = new Question(req.body);
  question.save()
    .catch(err => next(err))
    .then(question => {
      res.status(201);
      res.json(question);
    });
});

// GET /questions/:id
// Route for specific questions
router.get('/:qId', (req, res, next) => {
    res.json(req.question);
});

// POST /questions/:id/answers
// Route for creating answers to a question
router.post('/:qId/answers', (req, res, next) => {
  console.log(req.body)
    req.question.answers.push(req.body);
    req.question.save()
      .catch(err => next())
      .then(question => {
        res.status(201);
        res.json(question);
      });
});

// PUT /questions/:id/answers/:id
// Route for updating an answer
router.put('/:qId/answers/:aId', (req, res, next) => {
  req.answer.update(req.body, function(err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

// DELETE /questions/:id/answers/:id
// Route for deleting an answer
router.delete('/:qId/answers/:aId', (req, res) => {
  req.answer.remove(err => {
    req.question.save()
      .catch(err => next(err))
      .then(question => res.json(question));  
  });
});
  
// POST /questions/:id/answers/:id/vote-up
// POST /questions/:id/answers/:id/vote-down
// Vote on a specific an answer
router.post('/:qId/answers/:aId/vote-:dir', 
  (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      let err = new Error(`Not Found using ${req.params.dir}`);
      err.status = 404;
      next(err);
    } else {
      next();
    }
  }, 
  (req, res, next) => {
  req.answer.vote(req.params.dir, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});


module.exports = router;
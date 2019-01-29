'use strict';
const express = require('express');
const router = express.Router();
const {Word} = require('./models');

router.get('/', (req, res, next) => {
  Word.find()
    .then(words => {
      if (words) {
        // For now, get a random word, later implement spaced repetition
        const i = Math.floor(Math.random()*(words.length-1));
        res.json(words[i]);
      }
      else next();
    }).catch(err => next(err));
});

module.exports = {router};

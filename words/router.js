'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {User} = require('../users');

router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then(user => {
      if (user) res.json(user.words[user.head]);
      else next();
    }).catch(err => next(err));
});

module.exports = {router};

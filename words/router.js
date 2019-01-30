'use strict';
const express = require('express');
const router = express.Router();
const {User} = require('../users');

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then(user => {
      if (user) res.json(user.words[user.head]);
      else next();
    }).catch(err => next(err));
});

module.exports = {router};

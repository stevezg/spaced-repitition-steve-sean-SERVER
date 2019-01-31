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

router.get('/progress', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then(user => {
      if (user) return user.toJSON();
      else next();
    }).then(user => {
      let countCompleted = 0;
      user.words.forEach(word => {
        if (word.m >= 8) countCompleted++;
      });
      return res.json({countCompleted, countTotal: user.words.length});
    })
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
  const userId = req.user.id;
  const newM = req.body.m;
  User.findById(userId)
    .then(user => {
      if (user) return user.toJSON();
      else next();
    }).then(user => {
      // console.log(user);
      const currentHead = user.head; // save the value of the current head
      const currentNode = user.words[currentHead]; // save the node you just answered
      currentNode.m = newM;
      
      user.head = currentNode.next; // change the current head to whatever answered node's next pointer is

      let insertionPoint = currentHead; // find the insertion point
      for (let i=0; i<newM; i++) {
        if (user.words[insertionPoint].next === user.words.length) break;
        insertionPoint = user.words[insertionPoint].next;
      }
      // insert the node by changing the next pointer
      currentNode.next = user.words[insertionPoint].next;
      user.words[insertionPoint].next = currentHead;
      
      return User.findByIdAndUpdate(userId, user);
    }).then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = {router};

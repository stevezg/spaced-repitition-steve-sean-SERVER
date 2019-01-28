'use strict';
const express = require('express');
const {User} = require('./models');
const router = express.Router();

router.post('/', (req, res, next) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) return res.status(422).json({
    code: 422,
    reason: 'ValidationError',
    message: 'Missing Field',
    location: missingField
  });
  const nonStringField = requiredFields.find(field => typeof req.body[field] !== 'string');
  if (nonStringField) return res.status(422).json({
    code: 422,
    reason: 'ValidationError',
    message: 'Incorrect Field Type: expected string',
    location: nonStringField
  });
  const nonTrimmedField = requiredFields.find(field => req.body[field].trim() !== req.body[field]);
  if (nonTrimmedField) return res.status(422).json({
    code: 422,
    reason: 'ValidationError',
    message: 'Cannot start or end with whitespace',
    location: nonTrimmedField
  });
  const fieldSizes = {username: {min: 1}, password: {min: 10, max: 72}};
  const tooSmallField = Object.keys(fieldSizes).find(field =>
    'min' in fieldSizes[field] && req.body[field].length < fieldSizes[field].min);
  if (tooSmallField) return res.status(422).json({
    code: 422,
    reason: 'ValidationError',
    message: 'Field too small',
    location: tooSmallField
  });
  const tooLargeField = Object.keys(fieldSizes).find(field =>
    'max' in fieldSizes[field] && req.body[field].length > fieldSizes[field].max);
  if (tooLargeField) return res.status(422).json({
    code: 422,
    reason: 'ValidationError',
    message: 'Field too small',
    location: tooLargeField
  });
});

module.exports = {router};

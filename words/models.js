'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  word: {type: String, required: true, unique: true},
  translation: {type: String, required: true}
});

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__V;
  }
});

const Word = mongoose.model('Word', schema);
module.exports = {Word};


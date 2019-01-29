'use strict';
const {Word} = require('./models');

const data = [
  {word: 'Hallo', translation: 'hello'},
  {word: 'Tschüss', translation: 'bye'},
  {word: 'Guten Tag', translation: 'good day'},
  {word: 'Guten Morgen', translation: 'good morning'},
  {word: 'Guten Abend', translation: 'good evening'},
  {word: 'Gute Nacht', translation: 'good night'}
];
Word.insertMany(data)
  .then(res => console.log('success'))
  .catch(err => console.log(err));

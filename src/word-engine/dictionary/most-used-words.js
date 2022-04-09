const { moreWords } = require('./more-words');

// TODO: Tests
const additionalWords = [
  'laser',
  'slave',
  'toner',
  'latex',
  'saver',
  'remix',
  'tuner',
  'mixer',
  'atlas',
  'lotus',
  'oasis',
  'alias',
];

const mostUsedWords = moreWords.concat(additionalWords);

module.exports = Array.from(new Set(mostUsedWords));

const fs = require('fs');
const wordListPath = require('word-list');
const mostUsedWords = require('./most-used-words');

// TODO: Tests
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const baseDictionary = wordArray
  .filter((word) => word.length === 5)
  .concat(mostUsedWords);

module.exports = Array.from(new Set(baseDictionary));

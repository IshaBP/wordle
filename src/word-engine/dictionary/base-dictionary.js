const fs = require('fs');
const wordListPath = require('word-list');

// TODO: Tests
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const baseDictionary = wordArray.filter((word) => word.length === 5);

module.exports = baseDictionary;

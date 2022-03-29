const fs = require('fs');
const wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

const words = wordArray.filter((word) => word.length === 5);

module.exports = words;

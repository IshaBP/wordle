const path = require('path');
const base = require.resolve('dictionary-en');
const fs = require('fs');

const dicWords = fs.readFileSync(path.join(base, '../index.dic'), 'utf-8');

const words = dicWords
  .trim()
  .split('\n')
  .map((word) => word.split('/')[0])
  .filter((word) => word.length === 5)
  .filter((word) => word[0] !== word[0].toUpperCase());

console.log('words', JSON.stringify(words, null, 4));

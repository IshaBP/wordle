const { getWordsList } = require('most-common-words-by-language');

const x = ['speed', 'breed'];

const y = [
  'class',
  'press',
  'cross',
  'focus',
  'glass',
  'basis',
  'virus',
  'guess',
  'bonus',
  'dress',
  'gross',
  'brass',
  'grass',
  'atlas',
  'lotus',
  'oasis',
  'chaos',
  'chess',
  'alias',
  'minus',
  'bless',
];

const words = getWordsList('english')
  .filter((word) => word.length === 5)
  .filter((word) => word[word.length - 1] !== 's')
  .filter((word) => word.slice(word.length - 2) !== 'ed')
  .concat(x, y);

console.log(words, words.length);

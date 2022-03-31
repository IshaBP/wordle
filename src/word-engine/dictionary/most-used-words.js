const { getWordsList } = require('most-common-words-by-language');

const whitelistedWords = [
  // Words ending with 'ed' but not past tensed
  'speed',
  'breed',

  // Words ending with 's' but not plural
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

// const blacklistedWords = ['gonna', 'chile'];

const mostUsedWords = getWordsList('english')
  .filter((word) => word.length === 5)
  .filter((word) => word[word.length - 1] !== 's')
  .filter((word) => word.slice(word.length - 2) !== 'ed')
  .concat(whitelistedWords);

module.exports = mostUsedWords;

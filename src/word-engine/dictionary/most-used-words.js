const { getWordsList } = require('most-common-words-by-language');

// TODO: Tests
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

const blacklistedWords = [
  'gonna',
  'gotta',
  'chevy',
  'howto',
  'fatty',
  'kinda',
  'admin',
  'ascii',
  'chile',
  'qatar',
  'dubai',
  'vegas',
  'tahoe',
  'milan',
  'yemen',
  'tulsa',
  'papua',
  'joyce',
  'marco',
  'leone',
  'annie',
  'isaac',
  'kenny',
  'whore',
  'sperm',
  'casey',
  'clara',
  'allan',
  'sally',
  'cindy',
  'belle',
  'singh',
  'cohen',
  'diane',
  'betty',
  'niger',
  'dylan',
  'scott',
  'jesse',
  'bobby',
  'carlo',
  'edgar',
  'lucia',
  'teddy',
  'wendy',
  'kathy',
  'ricky',
  'sarah',
  'costa',
  'tamil',
  'hindu',
  'kodak',
  'sbjct',
  'mysql',
  'vsnet',
  'endif',
  'msgid',
  'samba',
  'twiki',
];

const mostUsedWords = getWordsList('english')
  .filter((word) => word.length === 5)
  .filter((word) => word[word.length - 1] !== 's')
  .filter((word) => word.slice(word.length - 2) !== 'ed')
  .filter((word) => blacklistedWords.includes(word) === false)
  .concat(whitelistedWords);

module.exports = mostUsedWords;

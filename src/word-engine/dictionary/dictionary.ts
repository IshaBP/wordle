import mostUsedWords from /* preval */ './most-used-words';
import baseDictionary from /* preval */ './base-dictionary';

export const isInDictionary = (word: string) => baseDictionary.includes(word);

export const getRandomWord = () =>
  mostUsedWords[getRandomInteger(mostUsedWords.length)];

const getRandomInteger = (max: number) => Math.floor(Math.random() * max);

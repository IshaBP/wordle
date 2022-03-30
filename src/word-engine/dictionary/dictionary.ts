import mostUsedWords from /* preval */ './most-used-words';
import baseDictionary from /* preval */ './base-dictionary';

console.log(mostUsedWords.length);
export const isInDictionary = (word: string) => baseDictionary.includes(word);

export const getRandomWord = () =>
  mostUsedWords[Math.floor(Math.random() * mostUsedWords.length)];

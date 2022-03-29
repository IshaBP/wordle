import { baseDictionary } from /* preval */ './base-dict';

console.log(baseDictionary);

export const isInDictionary = (word: string) => baseDictionary.includes(word);

export const getRandomWord = () => 'angel';

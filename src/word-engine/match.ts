import { isInDictionary } from "./dictionary";

export const match = (
  chosenWord: string,
  guessWord: string
): Status[] | null => {
  if (chosenWord.length !== guessWord.length) {
    throw new Error("chosenWord and guessWord should be of equal length");
  }

  if (!isInDictionary(chosenWord) || !isInDictionary(guessWord)) {
    return null;
  }

  if (chosenWord === guessWord) {
    return new Array(chosenWord.length).fill("MATCH");
  }

  // TODO: Abstract frequency map
  const freqMap = new Map();
  for (let idx = 0; idx < chosenWord.length; idx++) {
    const letter = chosenWord[idx];
    if (freqMap.has(letter)) {
      freqMap.set(letter, freqMap.get(letter) + 1);
    } else {
      freqMap.set(letter, 1);
    }
  }

  const result: Status[] = [];

  // TODO: Abstract word iterator
  for (let idx = 0; idx < chosenWord.length; idx++) {
    if (chosenWord[idx] === guessWord[idx]) {
      result[idx] = "MATCH";
      freqMap.set(guessWord[idx], freqMap.get(guessWord[idx]) - 1);
    } else {
      result[idx] = "NO_MATCH";
    }
  }

  for (let idx = 0; idx < chosenWord.length; idx++) {
    const guess = guessWord[idx];

    if (result[idx] === "NO_MATCH" && freqMap.get(guess)) {
      result[idx] = "PARTIAL_MATCH";
      freqMap.set(guess, freqMap.get(guess) - 1);
    }
  }

  return result;
};

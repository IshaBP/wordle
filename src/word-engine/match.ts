import { isInDictionary } from "./dictionary";
import { FrequencyMap } from "./frequency-map";
import { iterateWord } from "./util";

/**
 * Throws an error if both words are not of equal length.\
 * Returns null if chosenWord or guessWord or both are not present in dictionary.\
 * Returns an array of status corresponding to the letters in chosenWord if both words are in dictionary and are of same length.
 * @param chosenWord
 * @param guessWord
 * @returns MatchStatus[] | null
 */
export const match = (
  chosenWord: string,
  guessWord: string
): MatchStatus[] | null => {
  if (chosenWord.length !== guessWord.length) {
    throw new Error("chosenWord and guessWord should be of equal length");
  }

  if (!isInDictionary(chosenWord) || !isInDictionary(guessWord)) {
    return null;
  }

  if (chosenWord === guessWord) {
    return new Array(chosenWord.length).fill("MATCH");
  }

  const freqMap = new FrequencyMap(chosenWord);
  const result: MatchStatus[] = [];

  iterateWord(guessWord, (guess: string, idx: number) => {
    if (chosenWord[idx] === guess) {
      result[idx] = "MATCH";
      freqMap.decrement(guess);
    } else {
      result[idx] = "NO_MATCH";
    }
  });

  iterateWord(guessWord, (guess: string, idx: number) => {
    if (result[idx] === "NO_MATCH" && freqMap.has(guess)) {
      result[idx] = "PARTIAL_MATCH";
      freqMap.decrement(guess);
    }
  });

  return result;
};

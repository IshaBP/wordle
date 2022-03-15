import { isInDictionary } from "./dictionary";
import { FrequencyMap } from "./frequency-map";
import { iterateWord } from "./util";

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

  const freqMap = new FrequencyMap(chosenWord);
  const result: Status[] = [];

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

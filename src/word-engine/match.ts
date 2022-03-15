import { isInDictionary } from "./dictionary";
import { FrequencyMap } from "./frequency-map";

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

  // TODO: Abstract word iterator
  for (let idx = 0; idx < chosenWord.length; idx++) {
    const guess = guessWord[idx];

    if (chosenWord[idx] === guess) {
      result[idx] = "MATCH";
      freqMap.decrement(guess);
    } else {
      result[idx] = "NO_MATCH";
    }
  }

  for (let idx = 0; idx < chosenWord.length; idx++) {
    const guess = guessWord[idx];

    if (result[idx] === "NO_MATCH" && freqMap.has(guess)) {
      result[idx] = "PARTIAL_MATCH";
      freqMap.decrement(guess);
    }
  }

  return result;
};

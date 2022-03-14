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

  const result: Status[] = [];

  for (let idx = 0; idx < chosenWord.length; idx++) {
    if (chosenWord[idx] === guessWord[idx]) {
      result[idx] = "MATCH";
    } else {
      result[idx] = "NO_MATCH";
    }
  }

  return result;
};

import { isInDictionary } from "./dictionary";

export const match = (chosenWord: string, guessWord: string) => {
  if (chosenWord.length !== guessWord.length) {
    throw new Error("chosenWord and guessWord should be of equal length");
  }

  if (!isInDictionary(chosenWord) || !isInDictionary(guessWord)) {
    return null;
  }
};

/**
 * Iterates over the word with the callback for each letter in the word.
 * @param word
 * @param callback
 */
export const iterateWord = (
  word: string,
  callback: (letter: string, index: number) => void,
) => {
  for (let idx = 0; idx < word.length; idx++) {
    callback(word[idx], idx);
  }
};

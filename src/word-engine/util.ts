export const iterateWord = (
  word: string,
  callback: (letter: string, index: number) => void
) => {
  for (let idx = 0; idx < word.length; idx++) {
    callback(word[idx], idx);
  }
};

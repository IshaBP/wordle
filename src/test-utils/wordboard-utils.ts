import { getAllByLabelText, screen } from '@testing-library/react';

export const matchLetters = (rowIdx: number, word: string[]) => {
  const letters = getLettersForRow(rowIdx);

  word.forEach((letter, idx) => {
    expect(letters[idx]).toHaveTextContent(letter);
  });
};

export const getLettersForRow = (rowIdx: number) => {
  const row = screen.getAllByLabelText('guess-word')[rowIdx];
  return getAllByLabelText(row, 'letter');
};

export const getTileAtIndex = (rowIdx: number, columnIdx: number): Element =>
  document.querySelector(
    `[aria-label=guess-word]:nth-child(${
      rowIdx + 1
    }) [aria-label=letter]:nth-child(${columnIdx + 1})`,
  )!;

export const getAlphabetAtIndex = (rowIdx: number, columnIdx: number): string =>
  getTileAtIndex(rowIdx, columnIdx).textContent!;

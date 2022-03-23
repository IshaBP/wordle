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

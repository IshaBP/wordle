import {
  getAllByLabelText,
  getAllByText,
  screen,
} from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { darkTheme } from '../../theme';
import { Wordboard, WordboardProps } from './Wordboard';

describe('Wordboard', () => {
  it('should have 6 guess words', () => {
    renderWithProviders(<Wordboard acceptedRows={[]} currentRow={[]} />);

    expect(screen.getAllByLabelText('guess-word')).toHaveLength(6);
  });

  it('should have 5 letter tiles in each guess word', () => {
    renderWithProviders(<Wordboard acceptedRows={[]} currentRow={[]} />);

    for (let guessWord of screen.getAllByLabelText('guess-word')) {
      expect(getAllByLabelText(guessWord, 'letter')).toHaveLength(5);
    }
  });

  it('should display accepted words', () => {
    renderWithProviders(
      <Wordboard
        acceptedRows={[
          [
            { key: 'a', matchStatus: 'PARTIAL_MATCH' },
            { key: 'l', matchStatus: 'NO_MATCH' },
            { key: 'l', matchStatus: 'NO_MATCH' },
            { key: 'o', matchStatus: 'MATCH' },
            { key: 'w', matchStatus: 'NO_MATCH' },
          ],
        ]}
        currentRow={[]}
      />,
    );

    matchLetters(0, 'allow'.split(''));
  });

  it('should display word which is being currently edited', () => {
    renderWithProviders(
      <Wordboard acceptedRows={[]} currentRow={['a', 'l', 'l']} />,
    );

    matchLetters(0, ['a', 'l', 'l', '', '']);
  });

  it('should color tile with black for current row', () => {
    renderWithProviders(
      <Wordboard acceptedRows={[]} currentRow={['a', 'l']} />,
    );

    const letters = getLettersForRow(0);
    expect(letters[0]).toHaveStyle({
      backgroundColor: undefined,
    });
  });

  it("should color tile with green if MATCH_STATUS is 'MATCH'", () => {
    renderWithProviders(<Wordboard game={createGame('MATCH')} />);

    expect(document.querySelector('[aria-label=letter]')).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.MATCH,
    });
  });

  it.skip("should color tile with yellow if MATCH_STATUS is 'PARTIAL_MATCH'", () => {
    renderWithProviders(<Wordboard game={createGame('PARTIAL_MATCH')} />);

    expect(document.querySelector('[aria-label=letter]')).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.PARTIAL_MATCH,
    });
  });

  it.skip("should color tile with grey if MATCH_STATUS is 'NO_MATCH'", () => {
    renderWithProviders(<Wordboard game={createGame('NO_MATCH')} />);

    expect(document.querySelector('[aria-label=letter]')).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.NO_MATCH,
    });
  });

  it.todo("should animate if latest row status is 'INVALID'");
});

const wordLength = 5;
const guessCount = 6;

const createGame = (
  matchStatus: MatchStatus = 'INITIAL',
): WordboardProps['game'] =>
  new Array(guessCount).fill(null).map(() =>
    new Array(wordLength).fill(null).map(() => {
      if (matchStatus === 'INITIAL') {
        return {
          key: undefined,
          matchStatus: 'INITIAL',
        };
      } else {
        return {
          key: 'a',
          matchStatus: matchStatus,
        };
      }
    }),
  );

const matchLetters = (rowIdx: number, word: string[]) => {
  const letters = getLettersForRow(rowIdx);

  word.forEach((letter, idx) => {
    expect(letters[idx]).toHaveTextContent(letter);
  });
};

const getLettersForRow = (rowIdx: number) => {
  const row = screen.getAllByLabelText('guess-word')[rowIdx];
  return getAllByLabelText(row, 'letter');
};

import { getAllByLabelText, screen } from '@testing-library/react';
import {
  renderWithProviders,
  getLettersForRow,
  matchLetters,
} from '../../test-utils';
import { darkTheme } from '../../theme';
import { Wordboard } from './Wordboard';

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

  it('should display word in uppercase', () => {
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
        currentRow={['g', 'l', 'e', 'a', 'n']}
      />,
    );

    expect(getLettersForRow(0)[0]).toHaveStyle({
      textTransform: 'uppercase',
    });
    expect(getLettersForRow(1)[0]).toHaveStyle({
      textTransform: 'uppercase',
    });
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

  it('should color tile with corresponding match status color for accepted row', () => {
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

    const letters = getLettersForRow(0);
    expect(letters[0]).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.PARTIAL_MATCH,
    });
    expect(letters[1]).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.NO_MATCH,
    });
    expect(letters[2]).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.NO_MATCH,
    });
    expect(letters[3]).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.MATCH,
    });
    expect(letters[4]).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.NO_MATCH,
    });
  });

  it.todo("should animate if latest row status is 'INVALID'");
});

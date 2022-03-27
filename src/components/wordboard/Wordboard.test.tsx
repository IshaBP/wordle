import { getAllByLabelText, screen } from '@testing-library/react';
import {
  renderWithProviders,
  getLettersForRow,
  matchLetters,
  mockAnimate,
  restoreMockAnimate,
} from '../../test-utils';
import { darkTheme } from '../../theme';
import { Wordboard } from './Wordboard';

describe('Wordboard', () => {
  afterEach(restoreMockAnimate);

  describe('Word display', () => {
    it('should have 6 guess words', () => {
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={[]}
          currentRowStatus={'INITIAL'}
        />,
      );

      expect(screen.getAllByLabelText('guess-word')).toHaveLength(6);
    });

    it('should have 5 letter tiles in each guess word', () => {
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={[]}
          currentRowStatus={'INITIAL'}
        />,
      );

      for (const guessWord of screen.getAllByLabelText('guess-word')) {
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
          currentRowStatus={'INITIAL'}
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
          currentRowStatus={'IN_PROGRESS'}
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
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l', 'l']}
          currentRowStatus={'IN_PROGRESS'}
        />,
      );

      matchLetters(0, ['a', 'l', 'l', '', '']);
    });
  });

  describe('Tile color', () => {
    it('should color tile with black for current row', () => {
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l']}
          currentRowStatus={'IN_PROGRESS'}
        />,
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
          currentRowStatus={'INITIAL'}
        />,
      );

      const letters = getLettersForRow(0);
      expect(letters[0]).toHaveStyle({
        backgroundColor: darkTheme.bgColor.PARTIAL_MATCH,
      });
      expect(letters[1]).toHaveStyle({
        backgroundColor: darkTheme.bgColor.NO_MATCH,
      });
      expect(letters[2]).toHaveStyle({
        backgroundColor: darkTheme.bgColor.NO_MATCH,
      });
      expect(letters[3]).toHaveStyle({
        backgroundColor: darkTheme.bgColor.MATCH,
      });
      expect(letters[4]).toHaveStyle({
        backgroundColor: darkTheme.bgColor.NO_MATCH,
      });
    });
  });

  describe('Border color', () => {
    it('should not show border for accepted rows', () => {
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
          currentRowStatus={'INITIAL'}
        />,
      );

      const letters = getLettersForRow(0);
      expect(letters[0]).toHaveStyle({
        borderColor: 'transparent',
      });
    });

    it('should show highlighted border for current row tiles which have letters', () => {
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l']}
          currentRowStatus={'IN_PROGRESS'}
        />,
      );

      const letters = getLettersForRow(0);
      expect(letters[0]).toHaveStyle({
        borderColor: darkTheme.borderColor.HIGHLIGHT,
      });
      expect(letters[1]).toHaveStyle({
        borderColor: darkTheme.borderColor.HIGHLIGHT,
      });
    });

    it('should show normal border for current row tiles which do not letters', () => {
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l']}
          currentRowStatus={'IN_PROGRESS'}
        />,
      );

      const letters = getLettersForRow(0);
      expect(letters[2]).toHaveStyle({
        borderColor: darkTheme.borderColor.INITIAL,
      });
      expect(letters[3]).toHaveStyle({
        borderColor: darkTheme.borderColor.INITIAL,
      });
      expect(letters[4]).toHaveStyle({
        borderColor: darkTheme.borderColor.INITIAL,
      });
    });

    it('should show normal border for empty row tiles', () => {
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l']}
          currentRowStatus={'IN_PROGRESS'}
        />,
      );

      const letters = getLettersForRow(1); // empty row
      letters.forEach((letterElement) =>
        expect(letterElement).toHaveStyle({
          borderColor: darkTheme.borderColor.INITIAL,
        }),
      );
    });
  });

  describe('Current row animation', () => {
    it("should not animate if current row status is 'INITIAL'", () => {
      const animateFn = mockAnimate();
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={[]}
          currentRowStatus={'INITIAL'}
        />,
      );

      expect(animateFn).not.toHaveBeenCalled();
    });

    it("should not animate if current row status is 'IN_PROGRESS'", () => {
      const animateFn = mockAnimate();
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l', 'l']}
          currentRowStatus={'IN_PROGRESS'}
        />,
      );

      expect(animateFn).not.toHaveBeenCalled();
    });

    it("should animate if current row status is 'INVALID'", () => {
      const animateFn = mockAnimate();
      renderWithProviders(
        <Wordboard
          acceptedRows={[]}
          currentRow={['a', 'l', 'l']}
          currentRowStatus={'INVALID'}
        />,
      );

      expect(animateFn).toHaveBeenCalledTimes(1);

      const animateEl: HTMLElement = animateFn.mock.instances[0];
      expect(animateEl).toBeInstanceOf(HTMLElement);
      expect(animateEl.getAttribute('aria-label')).toBe('guess-word');
      expect(animateEl.getAttribute('data-word-type')).toBe('current');
    });
  });
});

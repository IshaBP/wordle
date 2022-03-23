import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CSSProperties } from 'styled-components';
import {
  getLettersForRow,
  matchKeyColors,
  matchLetters,
  renderWithProviders,
} from '../test-utils';
import { darkTheme } from '../theme';
import * as wordEngine from '../word-engine';
import { Game } from './Game';

jest.mock('../word-engine');
const mockedWordEngine = wordEngine as jest.Mocked<typeof wordEngine>;

describe('Game', () => {
  beforeEach(() => jest.resetAllMocks());

  describe('Wordboard', () => {
    it('should display Wordboard', () => {
      renderWithProviders(<Game />);

      screen.getByLabelText('wordboard');
    });

    it('should display alphabet on Wordboard on pressing it on Keyboard', () => {
      renderWithProviders(<Game />);
      userEvent.keyboard('abcde');

      matchLetters(0, 'abcde'.split(''));
    });

    it('should remove alphabet from Wordboard on pressing backspace on Keyboard', () => {
      renderWithProviders(<Game />);

      userEvent.keyboard('abcde{backspace}');
      expect(getLettersForRow(0)[4]).toHaveTextContent('');
      userEvent.keyboard('{backspace}');
      expect(getLettersForRow(0)[3]).toHaveTextContent('');
      userEvent.keyboard('{backspace}');
      expect(getLettersForRow(0)[2]).toHaveTextContent('');
      userEvent.keyboard('{backspace}');
      expect(getLettersForRow(0)[1]).toHaveTextContent('');
      userEvent.keyboard('{backspace}');
      expect(getLettersForRow(0)[0]).toHaveTextContent('');
    });

    it('should keep the row as is on pressing backspace in an empty row', () => {
      renderWithProviders(<Game />);
      userEvent.keyboard('{backspace}{backspace}{backspace}');

      matchLetters(0, ['', '', '', '', '']);
    });

    it('should not submit guess word if less than 5 alphabets are entered and enter is pressed', () => {
      renderWithProviders(<Game />);
      userEvent.keyboard('ab{enter}');

      expect(mockedWordEngine.match).not.toHaveBeenCalled();
    });

    it('should not proceed to next row if less than 5 alphabets are entered and enter is pressed', () => {
      renderWithProviders(<Game />);

      userEvent.keyboard('ab{enter}');
      expect(getLettersForRow(0)[2]).toHaveTextContent('');

      userEvent.keyboard('c');
      expect(getLettersForRow(0)[2]).toHaveTextContent('c'); // next letter input in the same row
      expect(getLettersForRow(1)[0]).toHaveTextContent('');
    });

    it('should try to match guess word if 5 alphabets are entered and enter is pressed', () => {
      mockWordEngine('baton');
      renderWithProviders(<Game />);
      userEvent.keyboard('abcde{enter}');

      expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
      expect(mockedWordEngine.match).toHaveBeenCalledWith('baton', 'abcde');
    });

    it('should not proceed to next row if guess word does not exist in the dictionary', () => {
      renderWithProviders(<Game />);
      userEvent.keyboard('abcde{enter}f');

      expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
      expect(getLettersForRow(1)[0]).toHaveTextContent(''); // next letter input not added in next row
    });

    it('should not proceed to next row when guessed word is completely matching', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);
      userEvent.keyboard('baton{enter}f');

      expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
      expect(getLettersForRow(1)[0]).toHaveTextContent(''); // next alphabet not added in the next row
    });

    it('should proceed to next row when guessed word is submitted and it exists in dictionary but is not completely matching', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);
      userEvent.keyboard('beads{enter}f');

      expect(getLettersForRow(1)[0]).toHaveTextContent('f'); // next alphabet added in the next row
    });

    it('should change color of all letter tiles once word is submitted', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);

      const letters = getLettersForRow(0);
      for (let letterIdx = 0; letterIdx < 5; letterIdx++) {
        expect(letters[letterIdx]).toHaveStyle({
          backgroundColor: undefined,
        });
      }

      userEvent.keyboard('beads{enter}');

      const updatedLetters = getLettersForRow(0);
      [
        darkTheme.matchStatus.MATCH,
        darkTheme.matchStatus.NO_MATCH,
        darkTheme.matchStatus.PARTIAL_MATCH,
        darkTheme.matchStatus.NO_MATCH,
        darkTheme.matchStatus.NO_MATCH,
      ].forEach((color: CSSProperties['backgroundColor'], letterIdx: number) =>
        expect(updatedLetters[letterIdx]).toHaveStyle({
          backgroundColor: color,
        }),
      );
    });

    it('should not accept input once all 6 guesses are exhausted', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);

      userEvent.keyboard('beads{enter}');
      userEvent.keyboard('glean{enter}');
      userEvent.keyboard('ounce{enter}');
      userEvent.keyboard('angel{enter}');
      userEvent.keyboard('basis{enter}');
      userEvent.keyboard('baths{enter}');

      expect(mockedWordEngine.match).toHaveBeenCalledTimes(6);

      userEvent.keyboard('nudge{enter}');

      expect(mockedWordEngine.match).toHaveBeenCalledTimes(6);
    });
  });

  describe('Keyboard', () => {
    it('should display Keyboard', () => {
      renderWithProviders(<Game />);

      screen.getByLabelText('keyboard');
    });

    it('should add button color in keyboard once alphabet is submitted for the first time', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);

      userEvent.keyboard('beads{enter}');

      matchKeyColors({
        B: darkTheme.matchStatus.MATCH,
        E: darkTheme.matchStatus.NO_MATCH,
        A: darkTheme.matchStatus.PARTIAL_MATCH,
        D: darkTheme.matchStatus.NO_MATCH,
        S: darkTheme.matchStatus.NO_MATCH,
      });
    });

    it('should update button color if eventual guesses have better match status (MATCH > PARTIAL_MATCH > NO_MATCH)', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);

      userEvent.keyboard('beads{enter}');

      matchKeyColors({
        A: darkTheme.matchStatus.PARTIAL_MATCH,
      });

      userEvent.keyboard('baths{enter}');

      matchKeyColors({
        A: darkTheme.matchStatus.MATCH,
      });
    });

    it('should not update button color if eventual guesses have worse match status (MATCH > PARTIAL_MATCH > NO_MATCH)', () => {
      mockWordEngine('baton', true);
      renderWithProviders(<Game />);

      userEvent.keyboard('baths{enter}');

      matchKeyColors({
        A: darkTheme.matchStatus.MATCH,
      });

      userEvent.keyboard('beads{enter}');

      matchKeyColors({
        A: darkTheme.matchStatus.MATCH,
      });
    });
  });

  describe('Toast', () => {
    it.todo(
      "should display a toast with text 'Magnificent' if guessed word completely matches chosen word",
    );
    it.todo(
      "should display a toast with text 'Not a valid word' if guessed word is not in dictionary",
    );
    it.todo(
      "should display a toast with text 'Not enough letters' if guessed word has less than 5 alphabets",
    );
    it.todo(
      "should display a toast with text 'Better luck next time' if all 6 guesses are exhausted and word has not been guessed",
    );
  });
});

const mockWordEngine = (chosenWord: string, useActualMatch = false) => {
  if (useActualMatch) {
    const actualWordEngine = jest.requireActual('../word-engine');
    mockedWordEngine.match.mockImplementation(actualWordEngine.match);
  }
  mockedWordEngine.getRandomWord.mockReturnValueOnce(chosenWord);
};

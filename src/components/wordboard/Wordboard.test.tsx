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
    renderWithProviders(
      <Wordboard game={createGame()} latestRowStatus={'IN_PROGRESS'} />,
    );

    expect(screen.getAllByLabelText('guess-word')).toHaveLength(6);
  });

  it('should have 5 letter tiles in each guess word', () => {
    renderWithProviders(
      <Wordboard game={createGame()} latestRowStatus={'IN_PROGRESS'} />,
    );

    for (let guessWord of screen.getAllByLabelText('guess-word')) {
      expect(getAllByLabelText(guessWord, 'letter')).toHaveLength(5);
    }
  });

  it('should display alphabets in the letter tiles', () => {
    renderWithProviders(
      <Wordboard
        game={createGame('PARTIAL_MATCH')}
        latestRowStatus={'IN_PROGRESS'}
      />,
    );

    for (let guessWord of screen.getAllByLabelText('guess-word')) {
      expect(getAllByText(guessWord, 'A')).toHaveLength(5);
    }
  });

  it("should color tile with black if MATCH_STATUS is 'INITIAL'", () => {
    renderWithProviders(
      <Wordboard game={createGame()} latestRowStatus={'IN_PROGRESS'} />,
    );

    expect(document.querySelector('[aria-label=letter]')).toHaveStyle({
      backgroundColor: undefined,
    });
  });

  it("should color tile with green if MATCH_STATUS is 'MATCH'", () => {
    renderWithProviders(
      <Wordboard game={createGame('MATCH')} latestRowStatus={'IN_PROGRESS'} />,
    );

    expect(document.querySelector('[aria-label=letter]')).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.MATCH,
    });
  });

  it("should color tile with yellow if MATCH_STATUS is 'PARTIAL_MATCH'", () => {
    renderWithProviders(
      <Wordboard
        game={createGame('PARTIAL_MATCH')}
        latestRowStatus={'IN_PROGRESS'}
      />,
    );

    expect(document.querySelector('[aria-label=letter]')).toHaveStyle({
      backgroundColor: darkTheme.matchStatus.PARTIAL_MATCH,
    });
  });

  it("should color tile with grey if MATCH_STATUS is 'NO_MATCH'", () => {
    renderWithProviders(
      <Wordboard
        game={createGame('NO_MATCH')}
        latestRowStatus={'IN_PROGRESS'}
      />,
    );

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

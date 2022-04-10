import { AcceptedRows, CurrentRow, KeyboardProps, Letter } from '../components';
import { getRandomWord, match } from '../word-engine';
import { useMemoOnce } from './useMemoOnce';

type KeyStatusMap = KeyboardProps['keyMatchStatusMap'];

type Action =
  | {
      type: 'BKSP' | 'ENT' | 'NEW_GAME';
    }
  | {
      type: 'LETTER';
      code: KeyCode;
    };

export type CurrentRowStatus = 'INITIAL' | 'IN_PROGRESS' | 'INVALID';

export interface GameState {
  gameStatus: 'IN_PROGRESS' | 'WON' | 'LOST' | 'ABANDONED';
  chosenWord: string;
  acceptedRows: AcceptedRows;
  currentRow: CurrentRow;
  currentRowStatus: CurrentRowStatus;
  keyStatusMap: KeyStatusMap;
}

export const reducer = (prevState: GameState, action: Action): GameState => {
  const { currentRow, acceptedRows, keyStatusMap, chosenWord } = prevState;

  const currentLetterIdx = currentRow.length;
  const currentWordIdx = acceptedRows.length;
  const state: GameState = { ...prevState, currentRowStatus: 'IN_PROGRESS' };

  switch (action.type) {
    case 'BKSP':
      return currentLetterIdx > 0
        ? { ...state, currentRow: currentRow.slice(0, -1) }
        : state;

    case 'ENT':
      if (currentLetterIdx === 5) {
        const guessWord = currentRow.join('');
        const matchResult = match(chosenWord, guessWord);

        if (matchResult) {
          const latestAcceptedRow: Letter[] = matchResult.map(
            (result, idx) => ({
              key: currentRow[idx],
              matchStatus: result,
            }),
          );

          const updatedState: GameState = {
            ...state,
            acceptedRows: [...acceptedRows, latestAcceptedRow],
            currentRow: [],
            currentRowStatus: 'INITIAL',
            keyStatusMap: getUpdatedKeyStatusMap(
              latestAcceptedRow,
              keyStatusMap,
            ),
          };

          if (isGuessedWordCorrect(matchResult)) {
            // Game won
            return { ...updatedState, gameStatus: 'WON' };
          } else if (currentWordIdx < 5) {
            // Game in progress
            return updatedState;
          } else {
            // Game lost
            return { ...updatedState, gameStatus: 'LOST' };
          }
        }
      }
      return { ...state, currentRowStatus: 'INVALID' };

    case 'LETTER':
      return currentRow.length < 5
        ? { ...state, currentRow: [...currentRow, action.code] }
        : state;

    case 'NEW_GAME':
      return getNewGameState();
  }
};

export const useInitialState = (wordleState: WordleState): GameState => {
  return useMemoOnce((): GameState => {
    if (wordleState.currentGame) {
      const {
        currentGame: { chosenWord, acceptedWords },
      } = wordleState;

      const acceptedRows = acceptedWords.reduce((accumulator, current) => {
        const matchStatus = match(chosenWord, current)!;
        const acceptedRow: Letter[] = matchStatus.map((result, idx) => ({
          key: current[idx] as KeyCode,
          matchStatus: result,
        }));
        accumulator.push(acceptedRow);
        return accumulator;
      }, [] as Letter[][]);

      const keyStatusMap = acceptedRows.reduce((accumulator, current) => {
        return getUpdatedKeyStatusMap(current, accumulator);
      }, {});

      return {
        gameStatus: 'IN_PROGRESS',
        chosenWord: chosenWord,
        acceptedRows,
        currentRow: [],
        keyStatusMap,
        currentRowStatus: 'INITIAL',
      };
    } else {
      return getNewGameState();
    }
  });
};

const getNewGameState = (): GameState => ({
  gameStatus: 'IN_PROGRESS',
  chosenWord: getRandomWord(),
  acceptedRows: [],
  currentRow: [],
  keyStatusMap: {},
  currentRowStatus: 'INITIAL',
});

const isGuessedWordCorrect = (matchResult: MatchStatus[]) =>
  matchResult.every((letterResult) => letterResult === 'MATCH');

const getUpdatedKeyStatusMap = (
  wordRow: Letter[],
  keyStatusMap: KeyStatusMap,
): KeyStatusMap => {
  const matchStatusMap: Record<MatchStatus, number> = {
    NO_MATCH: 1,
    PARTIAL_MATCH: 2,
    MATCH: 3,
  };

  const max = (
    existingKeyStatus: MatchStatus | undefined,
    newKeyStatus: MatchStatus,
  ): MatchStatus => {
    if (existingKeyStatus == null) {
      return newKeyStatus;
    }

    return matchStatusMap[existingKeyStatus] > matchStatusMap[newKeyStatus]
      ? existingKeyStatus
      : newKeyStatus;
  };

  const updatedKeyStatusMap = { ...keyStatusMap };

  for (const { key, matchStatus } of wordRow) {
    updatedKeyStatusMap[key] = max(updatedKeyStatusMap[key], matchStatus);
  }

  return updatedKeyStatusMap;
};

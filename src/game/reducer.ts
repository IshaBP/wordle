import { AcceptedRows, CurrentRow, KeyboardProps, Letter } from '../components';
import { match } from '../word-engine';

type KeyStatusMap = KeyboardProps['keyMatchStatusMap'];

type Action =
  | {
      type: 'BKSP';
    }
  | {
      type: 'ENT';
      chosenWord: string;
    }
  | {
      type: 'LETTER';
      code: KeyCode;
    };

interface State {
  gameOver: boolean;
  acceptedRows: AcceptedRows;
  currentRow: CurrentRow;
  keyStatusMap: KeyStatusMap;
}

export const initialState: State = {
  gameOver: false,
  acceptedRows: [],
  currentRow: [],
  keyStatusMap: {},
};

export const reducer = (state: State, action: Action): State => {
  const { currentRow, acceptedRows, keyStatusMap } = state;

  const currentLetterIdx = currentRow.length;
  const currentWordIdx = acceptedRows.length;

  switch (action.type) {
    case 'BKSP':
      return currentLetterIdx > 0
        ? { ...state, currentRow: currentRow.slice(0, -1) }
        : state;

    case 'ENT':
      if (currentLetterIdx === 5) {
        const guessWord = currentRow.join('');
        const matchResult = match(action.chosenWord, guessWord);

        if (matchResult) {
          const latestAcceptedRow: Letter[] = matchResult.map(
            (result, idx) => ({
              key: currentRow[idx],
              matchStatus: result,
            }),
          );

          const updatedState: State = {
            ...state,
            acceptedRows: [...acceptedRows, latestAcceptedRow],
            currentRow: [],
            keyStatusMap: getUpdatedKeyStatusMap(
              latestAcceptedRow,
              keyStatusMap,
            ),
          };

          if (isGuessedWordCorrect(matchResult)) {
            // Game won
            return { ...updatedState, gameOver: true };
          } else if (currentWordIdx < 5) {
            // Game in progress
            return updatedState;
          } else {
            // Game lost
            return { ...updatedState, gameOver: true };
          }
        }
      }
      return state;

    case 'LETTER':
      return currentRow.length < 5
        ? { ...state, currentRow: [...currentRow, action.code] }
        : state;
  }
};

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

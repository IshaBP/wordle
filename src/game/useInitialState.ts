import { Letter } from '../components';
import { getRandomWord, match } from '../word-engine';
import { GameState } from './reducer';

export const useInitialState = (wordleState: WordleState): GameState => {
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

    return {
      gameOver: false,
      chosenWord: chosenWord,
      acceptedRows,
      currentRow: [],
      keyStatusMap: {},
      currentRowStatus: 'INITIAL',
    };
  } else {
    return {
      gameOver: false,
      chosenWord: getRandomWord(),
      acceptedRows: [],
      currentRow: [],
      keyStatusMap: {},
      currentRowStatus: 'INITIAL',
    };
  }
};

import { getRandomWord } from '../word-engine';
import { GameState } from './reducer';

export const useInitialState = (wordleState: WordleState): GameState => {
  if (wordleState.currentGame) {
    return {
      gameOver: false,
      chosenWord: wordleState.currentGame.chosenWord,
      acceptedRows: [],
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

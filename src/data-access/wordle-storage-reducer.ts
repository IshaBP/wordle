import { GameState } from '../game/reducer';

type WordleStorageAction =
  | {
      type: 'START_GAME';
      chosenWord: string;
    }
  | {
      type: 'UPDATE_ACCEPTED_WORDS';
      acceptedWord: string;
    }
  | {
      type: 'END_GAME';
      status: GameState['gameStatus'];
    };

// TODO: JsDoc
// TODO: Test
export const wordleStorageReducer = (
  state: WordleStorageState,
  action: WordleStorageAction,
): WordleStorageState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        currentGame: {
          acceptedWords: [],
          chosenWord: action.chosenWord,
        },
        wordList: [action.chosenWord, ...state.wordList],
      };
    case 'UPDATE_ACCEPTED_WORDS': {
      const currentGame = state.currentGame!;
      return {
        ...state,
        currentGame: {
          ...currentGame,
          acceptedWords: [...currentGame!.acceptedWords, action.acceptedWord],
        },
      };
    }
    case 'END_GAME': {
      const newStats = { ...state.stats };

      if (action.status === 'WON') {
        newStats.won += 1;
      } else if (action.status === 'LOST') {
        newStats.lost += 1;
      } else if (action.status === 'ABANDONED') {
        newStats.abandoned += 1;
      }

      return { ...state, currentGame: null, stats: newStats };
    }
  }
};

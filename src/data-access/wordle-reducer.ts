type Action =
  | {
      type: 'START_GAME';
      chosenWord: string;
    }
  | {
      type: 'UPDATE_ACCEPTED_WORDS';
      acceptedWord: string;
    };

// TODO: JsDoc
// TODO: Test
export const wordleReducer = (
  state: WordleState,
  action: Action,
): WordleState => {
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
  }
};

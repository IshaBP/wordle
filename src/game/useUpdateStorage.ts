import { useEffect } from 'react';
import { useStorageReducer } from './Game';
import { GameState } from './reducer';

export const useUpdateStorage = (gameState: GameState) => {
  const [wordleState, dispatchStorageAction] = useStorageReducer();
  const { gameStatus, acceptedRows, chosenWord } = gameState;

  useEffect(() => {
    if (!wordleState.currentGame?.chosenWord) {
      dispatchStorageAction({
        type: 'START_GAME',
        chosenWord,
      });
    }
  }, [chosenWord, dispatchStorageAction, wordleState.currentGame?.chosenWord]);

  useEffect(() => {
    if (
      acceptedRows.length > 0 &&
      acceptedRows.length !== wordleState.currentGame?.acceptedWords.length
    ) {
      dispatchStorageAction({
        type: 'UPDATE_ACCEPTED_WORDS',
        acceptedWord: acceptedRows[acceptedRows.length - 1]
          .map((acceptedRow) => acceptedRow.key)
          .join(''),
      });
    }
  }, [
    acceptedRows,
    dispatchStorageAction,
    wordleState.currentGame?.acceptedWords.length,
  ]);

  useEffect(() => {
    if (gameStatus !== 'IN_PROGRESS') {
      dispatchStorageAction({ type: 'END_GAME', status: gameStatus });
    }
  }, [dispatchStorageAction, gameStatus]);
};

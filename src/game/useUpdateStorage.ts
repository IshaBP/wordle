import { useEffect } from 'react';
import { useStorageReducer } from './Game';
import { GameState } from './reducer';

export const useUpdateStorage = (gameState: GameState) => {
  const [wordleStorageState, dispatchStorageAction] = useStorageReducer();
  const { gameStatus, acceptedRows, chosenWord } = gameState;

  useEffect(() => {
    if (wordleStorageState.currentGame?.chosenWord == null) {
      dispatchStorageAction({
        type: 'START_GAME',
        chosenWord,
      });
    }
  }, [
    chosenWord,
    dispatchStorageAction,
    wordleStorageState.currentGame?.chosenWord,
  ]);

  useEffect(() => {
    if (
      acceptedRows.length > 0 &&
      acceptedRows.length !==
        wordleStorageState.currentGame?.acceptedWords.length
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
    wordleStorageState.currentGame?.acceptedWords.length,
  ]);

  useEffect(() => {
    if (gameStatus !== 'IN_PROGRESS') {
      dispatchStorageAction({ type: 'END_GAME', status: gameStatus });
    }
  }, [dispatchStorageAction, gameStatus]);
};

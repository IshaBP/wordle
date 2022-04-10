import { useCallback, useEffect, useReducer } from 'react';
import { FlexBox } from 'react-styled-flex';
import { Keyboard, Wordboard } from '../components';
import { createStorageReducer } from '../data-access/createStorageReducer';
import { wordleReducer } from '../data-access/wordle-reducer';
import { reducer, useInitialState } from './reducer';

// TODO: Move createStorageReducer code to separate hook
// TODO: Test
// TODO: Rename variables
const useStorageReducer = createStorageReducer(wordleReducer, 'wordle-state', {
  currentGame: null,
  stats: {
    won: 0,
    lost: 0,
    abandoned: 0,
  },
  wordList: [],
});

export const Game = () => {
  const [wordleState, dispatchStorageAction] = useStorageReducer();
  const initialState = useInitialState(wordleState);
  const [
    {
      gameStatus,
      chosenWord,
      acceptedRows,
      currentRow,
      currentRowStatus,
      keyStatusMap,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  const onKey = useCallback(
    (code: KeyCode) => {
      if (gameStatus !== 'IN_PROGRESS') {
        return;
      }

      if (code === '<BKSP>') {
        dispatch({ type: 'BKSP' });
      } else if (code === '<ENT>') {
        dispatch({ type: 'ENT' });
      } else {
        dispatch({ type: 'LETTER', code });
      }
    },
    [gameStatus, dispatch],
  );

  return (
    <FlexBox
      aria-label='game'
      column
      height={'100%'}
      alignItems={'center'}
      justifyContent={'space-around'}
      padding={'0 0.75rem'}
    >
      <Wordboard
        acceptedRows={acceptedRows}
        currentRow={currentRow}
        currentRowStatus={currentRowStatus}
      />
      <Keyboard keyMatchStatusMap={keyStatusMap} onKey={onKey} />
    </FlexBox>
  );
};

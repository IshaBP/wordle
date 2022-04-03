import { useCallback, useEffect, useReducer } from 'react';
import { FlexBox } from 'react-styled-flex';
import { Keyboard, Wordboard } from '../components';
import { createStorageReducer } from '../data-access/createStorageReducer';
import { wordleReducer } from '../data-access/wordle-reducer';
import { reducer } from './reducer';
import { useInitialState } from './useInitialState';

// TODO: Move createStorageReducer code to separate hook
// TODO: Test
// TODO: Rename variables
const useStorageReducer = createStorageReducer(
  wordleReducer,
  {
    currentGame: null,
    stats: {
      won: 0,
      lost: 0,
      abandoned: 0,
    },
    wordList: [],
  },
  'wordle-state',
);

export const Game = () => {
  const [wordleState, dispatchStorageAction] = useStorageReducer();
  const initialState = useInitialState(wordleState);
  const [
    {
      gameOver,
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

  const onKey = useCallback(
    (code: KeyCode) => {
      if (gameOver) {
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
    [gameOver, dispatch],
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

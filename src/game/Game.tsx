import { useCallback, useEffect, useReducer } from 'react';
import { FlexBox } from 'react-styled-flex';
import { Keyboard, Wordboard } from '../components';
import { createStorageReducer } from '../data-access/createStorageReducer';
import { wordleStorageReducer } from '../data-access/wordle-storage-reducer';
import { reducer, useInitialState } from './reducer';
import { useUpdateStorage } from './useUpdateStorage';

// TODO: Move createStorageReducer code to separate hook
// TODO: Test
// TODO: Rename variables
export const useStorageReducer = createStorageReducer(
  wordleStorageReducer,
  'wordle-state',
  {
    currentGame: null,
    stats: {
      won: 0,
      lost: 0,
      abandoned: 0,
    },
    wordList: [],
  },
);

export const Game = () => {
  const [wordleState] = useStorageReducer();
  const initialState = useInitialState(wordleState);
  const [gameState, dispatch] = useReducer(reducer, initialState);
  useUpdateStorage(gameState);

  const {
    gameStatus,
    acceptedRows,
    currentRow,
    currentRowStatus,
    keyStatusMap,
  } = gameState;

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

  useEffect(() => {
    if (gameStatus !== 'IN_PROGRESS') {
      const startNewGame = window.confirm(gameStatus);

      if (startNewGame) {
        dispatch({ type: 'NEW_GAME' });
      }
    }
  }, [gameStatus]);

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

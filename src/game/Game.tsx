import { useCallback, useReducer } from 'react';
import { FlexBox } from 'react-styled-flex';
import { Keyboard, Wordboard } from '../components';
import { initialState, reducer } from './reducer';

// TODO: Move createStorageReducer code to separate hook
// TODO: Test
// TODO: Rename variables
export const Game = () => {
  const [
    { gameOver, acceptedRows, currentRow, currentRowStatus, keyStatusMap },
    dispatch,
  ] = useReducer(reducer, initialState);

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

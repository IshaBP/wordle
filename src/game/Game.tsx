import { useCallback, useMemo, useRef, useState } from 'react';
import { FlexBox } from 'react-styled-flex';
import {
  AcceptedRows,
  CurrentRow,
  Keyboard,
  KeyboardProps,
  Row,
  Wordboard,
} from '../components';
import { getRandomWord, match } from '../word-engine';
import { useSyncState } from './useSyncState';

type KeyStatusMap = KeyboardProps['keyMatchStatusMap'];

export const Game = () => {
  const chosenWord = useMemo(() => getRandomWord(), []);
  const gameOver = useRef(false);
  const [acceptedRows, setAcceptedRows] = useState<AcceptedRows>([]);
  const [getCurrentRow, setCurrentRow] = useSyncState<CurrentRow>([]);
  const [keyStatusMap, setKeyStatusMap] = useState<KeyStatusMap>({});

  const onKey = useCallback(
    (code: KeyCode) => {
      if (gameOver.current) {
        return;
      }

      const currentRow = getCurrentRow();
      const currentLetterIdx = currentRow.length;
      const currentWordIdx = acceptedRows.length;

      if (code === '<BKSP>') {
        if (currentLetterIdx > 0) {
          const updatedRow = currentRow.slice(0, -1);
          setCurrentRow(updatedRow);
        }
      } else if (code === '<ENT>') {
        if (currentLetterIdx === 5) {
          const guessWord = currentRow.join('');
          const matchResult = match(chosenWord, guessWord);

          if (matchResult) {
            const latestAcceptedRow: Row = matchResult.map((result, idx) => ({
              key: currentRow[idx],
              matchStatus: result,
            }));

            setAcceptedRows([...acceptedRows, latestAcceptedRow]);
            setCurrentRow([]);
            setKeyStatusMap(
              getUpdatedKeyStatusMap(latestAcceptedRow, keyStatusMap),
            );

            if (isGuessedWordCorrect(matchResult)) {
              // Game won
              gameOver.current = true;
            } else if (currentWordIdx < 5) {
              // Game in progress
            } else {
              // Game lost
              gameOver.current = true;
            }
          }
          return [];
        }
      } else if (currentLetterIdx < 5) {
        setCurrentRow([...currentRow, code]);
        console.log(currentLetterIdx, currentRow, code);
      }
    },
    [
      getCurrentRow,
      setCurrentRow,
      gameOver,
      acceptedRows,
      setAcceptedRows,
      setKeyStatusMap,
      getUpdatedKeyStatusMap,
      keyStatusMap,
      match,
      chosenWord,
      isGuessedWordCorrect,
    ],
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
      <Wordboard acceptedRows={acceptedRows} currentRow={getCurrentRow()} />
      <Keyboard keyMatchStatusMap={keyStatusMap} onKey={onKey} />
    </FlexBox>
  );
};

const isGuessedWordCorrect = (matchResult: MatchStatus[]) =>
  matchResult.every((letterResult) => letterResult === 'MATCH');

const getUpdatedKeyStatusMap = (
  wordRow: Row,
  keyStatusMap: KeyStatusMap,
): KeyStatusMap => {
  const matchStatusMap: Record<MatchStatus, number> = {
    IN_PROGRESS: 1,
    NO_MATCH: 2,
    PARTIAL_MATCH: 3,
    MATCH: 4,
  };

  const max = (
    existingKeyStatus: MatchStatus | undefined,
    newKeyStatus: MatchStatus,
  ): MatchStatus => {
    if (existingKeyStatus == null) {
      return newKeyStatus;
    }

    return matchStatusMap[existingKeyStatus] > matchStatusMap[newKeyStatus]
      ? existingKeyStatus
      : newKeyStatus;
  };

  for (let { key, matchStatus } of wordRow) {
    if (key) {
      // TODO: resolve TS error and remove if condition, key will always be present in wordRow while updating keyStatusMap
      keyStatusMap[key] = max(keyStatusMap[key], matchStatus);
    }
  }

  return { ...keyStatusMap };
};

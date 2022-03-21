import { useMemo, useRef, useState } from 'react';
import { FlexBox } from 'react-styled-flex';
import {
  AcceptedRows,
  CurrentRow,
  Keyboard,
  KeyboardProps,
  Row,
  Wordboard,
  WordboardProps,
} from '../components';
import { getRandomWord, match } from '../word-engine';

type KeyStatusMap = KeyboardProps['keyMatchStatusMap'];

export const Game = () => {
  const chosenWord = useMemo(() => getRandomWord(), []);
  const gameOver = useRef(false);
  // const currentRowRef = useRef<CurrentRow>([]);
  const [acceptedRows, setAcceptedRows] = useState<AcceptedRows>([]);
  const [currentRow, setCurrentRow] = useState<CurrentRow>([]);
  const [keyStatusMap, setKeyStatusMap] = useState<KeyStatusMap>({});
  const [currentWordIdx, setCurrentWordIdx] = useState(0); // TODO: Remove, not required
  // TODO: create useSyncState hook
  // const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  // const [dummy, setdummy] = useState(0);

  const onKey = (code: KeyCode) => {
    if (gameOver.current) {
      return;
    }

    setCurrentRow((currentRow) => {
      // const currentRow: CurrentRow = currentRowRef.current;
      const currentLetterIdx = currentRow.length;

      if (code === '<BKSP>') {
        if (currentLetterIdx > 0) {
          const updatedRow = currentRow.slice(0, -1);
          // currentRowRef.current = updatedRow;
          // setCurrentRow(updatedRow);
          return updatedRow;
          // setCurrentLetterIdx(currentLetterIdx - 1);
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
            // currentRowRef.current = [];
            // setCurrentRow([]);
            setKeyStatusMap(
              getUpdatedKeyStatusMap(latestAcceptedRow, keyStatusMap),
            );

            if (isGuessedWordCorrect(matchResult)) {
              // Game won
              gameOver.current = true;
            } else if (currentWordIdx < 5) {
              // Game in progress
              setCurrentWordIdx(currentWordIdx + 1);
              // setCurrentLetterIdx(0);
            } else {
              // Game lost
              gameOver.current = true;
            }
          }
          return [];
        }
      } else if (currentLetterIdx < 5) {
        // Updating current row
        // currentRowRef.current = [...currentRow, code];
        // setCurrentRow((prevCurrentRow) => [...prevCurrentRow, code]);
        console.log(currentLetterIdx, currentRow, code);
        return [...currentRow, code];
        // console.log(dummy, currentRow, code);
        // setdummy((dummy) => dummy + 1);
        // currentRow[currentLetterIdx] = code;
        // setCurrentLetterIdx((prevCurrentLetterIdx) => prevCurrentLetterIdx + 1);
      }

      return currentRow;
    });
  };

  return (
    <FlexBox
      aria-label='game'
      column
      height={'100%'}
      alignItems={'center'}
      justifyContent={'space-around'}
      padding={'0 0.75rem'}
    >
      <Wordboard acceptedRows={acceptedRows} currentRow={currentRow} />
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

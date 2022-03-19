import { useMemo, useRef, useState } from 'react';
import {
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
  const [game, setGame] = useState<WordboardProps['game']>(createInitialGame);
  const [keyStatusMap, setKeyStatusMap] = useState<KeyStatusMap>({});
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const onKey = (code: KeyCode) => {
    if (gameOver.current) {
      return;
    }

    if (code === '<BKSP>') {
      if (currentLetterIdx > 0) {
        const updatedGame = [...game];
        updatedGame[currentWordIdx][currentLetterIdx - 1] = {
          key: undefined,
          matchStatus: 'INITIAL',
        };
        setGame(updatedGame);
        setCurrentLetterIdx(currentLetterIdx - 1);
      }
    } else if (code === '<ENT>') {
      if (currentLetterIdx === 5) {
        const guessWord = game[currentWordIdx]
          .map((letter) => letter.key)
          .join('');
        const matchResult = match(chosenWord, guessWord);

        if (matchResult) {
          const updatedGame = [...game];
          for (let letterIdx = 0; letterIdx < matchResult.length; letterIdx++) {
            updatedGame[currentWordIdx][letterIdx].matchStatus =
              matchResult[letterIdx];
          }
          setGame(updatedGame);
          setKeyStatusMap(
            getUpdatedKeyStatusMap(updatedGame[currentWordIdx], keyStatusMap),
          );
          if (isGuessedWordCorrect(matchResult)) {
            // Game won
            gameOver.current = true;
          } else if (currentWordIdx < 5) {
            // Game in progress
            setCurrentWordIdx(currentWordIdx + 1);
            setCurrentLetterIdx(0);
          } else {
            // Game lost
            gameOver.current = true;
          }
        }
      }
    } else if (currentLetterIdx < 5) {
      const updatedGame = [...game];
      updatedGame[currentWordIdx][currentLetterIdx] = {
        key: code,
        matchStatus: 'IN_PROGRESS',
      };
      setGame(updatedGame);
      setCurrentLetterIdx(currentLetterIdx + 1);
    }
  };

  return (
    <div aria-label='game'>
      <span>{currentWordIdx}</span>
      <span>{currentLetterIdx}</span>
      <Wordboard game={game} latestRowStatus={'IN_PROGRESS'} />
      <Keyboard keyMatchStatusMap={keyStatusMap} onKey={onKey} />
    </div>
  );
};

const isGuessedWordCorrect = (matchResult: MatchStatus[]) =>
  matchResult.every((letterResult) => letterResult === 'MATCH');

const createInitialGame = (): WordboardProps['game'] =>
  new Array(6).fill(null).map(() =>
    new Array(5).fill(null).map(() => ({
      key: undefined,
      matchStatus: 'INITIAL',
    })),
  );

const getUpdatedKeyStatusMap = (
  wordRow: Row,
  keyStatusMap: KeyStatusMap,
): KeyStatusMap => {
  const matchStatusMap: Record<MatchStatus, number> = {
    INITIAL: 0,
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

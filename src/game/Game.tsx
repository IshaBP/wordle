import { useMemo, useRef, useState } from 'react';
import { Keyboard } from '../components/keyboard/Keyboard';
import { Wordboard, WordboardProps } from '../components/wordboard/Wordboard';
import { getRandomWord, match } from '../word-engine';

export const Game = () => {
  const chosenWord = useMemo(() => getRandomWord(), []);
  const gameOver = useRef(false);
  const [game, setGame] = useState<WordboardProps['game']>(createInitialGame);
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
      <Keyboard keyMatchStatusMap={{}} onKey={onKey} />
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

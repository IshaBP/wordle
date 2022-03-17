import { useMemo, useState } from "react";
import { Keyboard } from "../components/keyboard/Keyboard";
import { Wordboard, WordboardProps } from "../components/wordboard/Wordboard";
import { getRandomWord, match } from "../word-engine";

const initialGame: WordboardProps["game"] = new Array(6).fill(null).map(() =>
  new Array(5).fill(null).map(() => ({
    key: undefined,
    matchStatus: "INITIAL",
  }))
);

export const Game = () => {
  const chosenWord = useMemo(() => getRandomWord(), []);
  const [game, setGame] = useState(initialGame);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const onKey = (code: KeyCode) => {
    if (code === "<BKSP>") {
      if (currentLetterIdx > 0) {
        const updatedGame = [...game];
        updatedGame[currentWordIdx][currentLetterIdx - 1] = {
          key: undefined,
          matchStatus: "INITIAL",
        };
        setGame(updatedGame);
        setCurrentLetterIdx(currentLetterIdx - 1);
      }
    } else if (code === "<ENT>") {
      if (currentLetterIdx === 5) {
        const guessWord = game[currentWordIdx]
          .map((letter) => letter.key)
          .join("");
        match(chosenWord, guessWord);
      }
    } else if (currentLetterIdx < 5) {
      const updatedGame = [...game];
      updatedGame[currentWordIdx][currentLetterIdx] = {
        key: code,
        matchStatus: "IN_PROGRESS",
      };
      setGame(updatedGame);
      setCurrentLetterIdx(currentLetterIdx + 1);
    }
  };

  return (
    <div aria-label="game">
      <span>{currentLetterIdx}</span>
      <Wordboard game={game} latestRowStatus={"IN_PROGRESS"} />
      <Keyboard onKey={onKey} />
    </div>
  );
};

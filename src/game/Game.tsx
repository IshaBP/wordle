import { useState } from "react";
import { Keyboard } from "../components/keyboard/Keyboard";
import { Wordboard, WordboardProps } from "../components/wordboard/Wordboard";

const game: WordboardProps["game"] = new Array(6).fill(null).map(() =>
  new Array(5).fill(null).map(() => ({
    key: "a",
    matchStatus: "MATCH",
  }))
);

export const Game = () => {
  return (
    <>
      <Wordboard game={game} latestRowStatus={"IN_PROGRESS"} />

      <Keyboard
        onKey={(key) => {
          console.log(key);
        }}
      />
    </>
  );
};

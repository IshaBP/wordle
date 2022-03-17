import { FlexBox } from "react-styled-flex";
import styled from "styled-components";

interface Letter {
  key: KeyCode;
  matchStatus: MatchStatus;
}

type Row = Array<Letter>;

export interface WordboardProps {
  game: Array<Row>;
  latestRowStatus: "ACCEPTED" | "IN_PROGRESS" | "INVALID";
}

export const Wordboard = ({ game, latestRowStatus }: WordboardProps) => {
  return (
    <FlexBox as={"section"} column gap={"1rem"}>
      {game.map((guessWord, wordIdx) => (
        <FlexBox key={wordIdx} aria-label={"guess-word"} gap={"1rem"}>
          {guessWord.map((letter, letterIdx) => (
            <Letter
              key={letterIdx}
              aria-label={"letter"}
              status={letter.matchStatus}
            >
              {letter.key}
            </Letter>
          ))}
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const Letter = styled.div<{ status: MatchStatus }>`
  border: 1px solid black;
  padding: 5px;
  background-color: ${({ status }) => {
    if (status === "MATCH") {
      return "green";
    } else if (status === "PARTIAL_MATCH") {
      return "yellow";
    } else if (status === "NO_MATCH") {
      return "grey";
    }
    return undefined;
  }};
`;

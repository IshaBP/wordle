import { getAllByLabelText, render, screen } from "@testing-library/react";
import { Wordboard, WordboardProps } from "./Wordboard";

describe("Wordboard", () => {
  it("should have 6 guess words", () => {
    render(<Wordboard game={game} latestRowStatus={"IN_PROGRESS"} />);

    expect(screen.getAllByLabelText("guess-word")).toHaveLength(6);
  });

  it("should have 5 letter tiles in each guess word", () => {
    render(<Wordboard game={game} latestRowStatus={"IN_PROGRESS"} />);

    for (let guessWord of screen.getAllByLabelText("guess-word")) {
      expect(getAllByLabelText(guessWord, "letter")).toHaveLength(5);
    }
  });

  it.todo("should colour tile with black if MATCH_STATUS is 'INITIAL'");
  it.todo("should colour tile with green if MATCH_STATUS is 'MATCH'");
  it.todo("should colour tile with yellow if MATCH_STATUS is 'PARTIAL_MATCH'");
  it.todo("should colour tile with grey if MATCH_STATUS is 'NO_MATCH'");
  it.todo("should animate if latest row status is 'INVALID'");

  // Move to toast
  it.todo(
    "should not prompt with 'Not a valid word' if latest row status is 'ACCEPTED'"
  );
  it.todo(
    "should prompt with 'Not a valid word' if latest row status is 'INVALID'"
  ); // word length less than 5 or word not in dictionary
});

const wordLength = 5;
const guessCount = 6;

const game: WordboardProps["game"] = new Array(guessCount).fill(null).map(() =>
  new Array(wordLength).fill(null).map(() => ({
    key: "a",
    matchStatus: "INITIAL",
  }))
);

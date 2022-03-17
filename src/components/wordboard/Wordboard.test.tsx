import {
  getAllByLabelText,
  getAllByText,
  render,
  screen,
} from "@testing-library/react";
import { Wordboard, WordboardProps } from "./Wordboard";

describe("Wordboard", () => {
  it("should have 6 guess words", () => {
    render(<Wordboard game={createGame()} latestRowStatus={"IN_PROGRESS"} />);

    expect(screen.getAllByLabelText("guess-word")).toHaveLength(6);
  });

  it("should have 5 letter tiles in each guess word", () => {
    render(<Wordboard game={createGame()} latestRowStatus={"IN_PROGRESS"} />);

    for (let guessWord of screen.getAllByLabelText("guess-word")) {
      expect(getAllByLabelText(guessWord, "letter")).toHaveLength(5);
    }
  });

  it("should display alphabets in the letter tiles", () => {
    render(
      <Wordboard
        game={createGame("PARTIAL_MATCH")}
        latestRowStatus={"IN_PROGRESS"}
      />
    );

    for (let guessWord of screen.getAllByLabelText("guess-word")) {
      expect(getAllByText(guessWord, "a")).toHaveLength(5);
    }
  });

  it("should colour tile with black if MATCH_STATUS is 'INITIAL'", () => {
    render(<Wordboard game={createGame()} latestRowStatus={"IN_PROGRESS"} />);

    expect(document.querySelector("[aria-label=letter]")).toHaveStyle({
      backgroundColor: undefined,
    });
  });

  it("should colour tile with green if MATCH_STATUS is 'MATCH'", () => {
    render(
      <Wordboard game={createGame("MATCH")} latestRowStatus={"IN_PROGRESS"} />
    );

    expect(document.querySelector("[aria-label=letter]")).toHaveStyle({
      backgroundColor: "green",
    });
  });

  it("should colour tile with yellow if MATCH_STATUS is 'PARTIAL_MATCH'", () => {
    render(
      <Wordboard
        game={createGame("PARTIAL_MATCH")}
        latestRowStatus={"IN_PROGRESS"}
      />
    );

    expect(document.querySelector("[aria-label=letter]")).toHaveStyle({
      backgroundColor: "yellow",
    });
  });

  it("should colour tile with grey if MATCH_STATUS is 'NO_MATCH'", () => {
    render(
      <Wordboard
        game={createGame("NO_MATCH")}
        latestRowStatus={"IN_PROGRESS"}
      />
    );

    expect(document.querySelector("[aria-label=letter]")).toHaveStyle({
      backgroundColor: "grey",
    });
  });

  it.todo("should animate if latest row status is 'INVALID'");
});

const wordLength = 5;
const guessCount = 6;

const createGame = (
  matchStatus: MatchStatus = "INITIAL"
): WordboardProps["game"] =>
  new Array(guessCount).fill(null).map(() =>
    new Array(wordLength).fill(null).map(() => {
      if (matchStatus === "INITIAL") {
        return {
          key: undefined,
          matchStatus: "INITIAL",
        };
      } else {
        return {
          key: "a",
          matchStatus: matchStatus,
        };
      }
    })
  );

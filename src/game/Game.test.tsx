import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as wordEngine from "../word-engine";
import { Game } from "./Game";

jest.mock("../word-engine");
const mockedWordEngine = wordEngine as jest.Mocked<typeof wordEngine>;

describe("Game", () => {
  beforeEach(() => jest.resetAllMocks());

  it("should display Wordboard and Keyboard", () => {
    render(<Game />);

    screen.getByLabelText("wordboard");
    screen.getByLabelText("keyboard");
  });

  it("should display alphabet on Wordboard on pressing it on Keyboard", () => {
    render(<Game />);

    userEvent.keyboard("abcde");
    expect(getAlphabetAtIndex(0, 0)).toBe("A");
    expect(getAlphabetAtIndex(0, 1)).toBe("B");
    expect(getAlphabetAtIndex(0, 2)).toBe("C");
    expect(getAlphabetAtIndex(0, 3)).toBe("D");
    expect(getAlphabetAtIndex(0, 4)).toBe("E");
  });

  it("should remove alphabet from Wordboard on pressing backspace on Keyboard", () => {
    render(<Game />);

    userEvent.keyboard("abcde{backspace}");
    expect(getAlphabetAtIndex(0, 4)).toBe("");
    userEvent.keyboard("{backspace}");
    expect(getAlphabetAtIndex(0, 3)).toBe("");
    userEvent.keyboard("{backspace}");
    expect(getAlphabetAtIndex(0, 2)).toBe("");
    userEvent.keyboard("{backspace}");
    expect(getAlphabetAtIndex(0, 1)).toBe("");
    userEvent.keyboard("{backspace}");
    expect(getAlphabetAtIndex(0, 0)).toBe("");
  });

  it("should keep the row as is on pressing backspace in an empty row", () => {
    render(<Game />);

    userEvent.keyboard("{backspace}{backspace}{backspace}");
    expect(getAlphabetAtIndex(0, 0)).toBe("");
    expect(getAlphabetAtIndex(0, 1)).toBe("");
    expect(getAlphabetAtIndex(0, 2)).toBe("");
    expect(getAlphabetAtIndex(0, 3)).toBe("");
    expect(getAlphabetAtIndex(0, 4)).toBe("");
  });

  it("should not submit guess word if less than 5 alphabets are entered and enter is pressed", () => {
    render(<Game />);

    userEvent.keyboard("ab{enter}");

    expect(mockedWordEngine.match).not.toHaveBeenCalled();
  });

  it("should not proceed to next row if less than 5 alphabets are entered and enter is pressed", () => {
    render(<Game />);

    userEvent.keyboard("ab{enter}");
    expect(getAlphabetAtIndex(0, 2)).toBe("");

    userEvent.keyboard("c");
    expect(getAlphabetAtIndex(0, 2)).toBe("C"); // next letter input in the same row
    expect(getAlphabetAtIndex(1, 0)).toBe("");
  });

  it("should try to match guess word if 5 alphabets are entered and enter is pressed", () => {
    mockWordEngine("baton");
    render(<Game />);

    userEvent.keyboard("abcde{enter}");
    expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
    expect(mockedWordEngine.match).toHaveBeenCalledWith("baton", "abcde");
  });

  it("should not proceed to next row if guess word does not exist in the dictionary", () => {
    render(<Game />);

    userEvent.keyboard("abcde{enter}f");

    expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
    expect(getAlphabetAtIndex(1, 0)).toBe(""); // next letter input not added in next row
  });

  it("should not proceed to next row when guessed word is completely matching", () => {
    mockWordEngine("baton", true);
    render(<Game />);

    userEvent.keyboard("baton{enter}f");

    expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
    expect(getAlphabetAtIndex(1, 0)).toBe(""); // next alphabet not added in the next row
  });

  it("should proceed to next row when guessed word is submitted and it exists in dictionary but is not completely matching", () => {
    mockWordEngine("baton", true);
    render(<Game />);

    userEvent.keyboard("beads{enter}f");

    expect(getAlphabetAtIndex(1, 0)).toBe("F"); // next alphabet added in the next row
  });

  it("should change colour of all letter tiles once word is submitted", () => {
    mockWordEngine("baton", true);
    render(<Game />);

    for (let letterIdx = 0; letterIdx < 5; letterIdx++) {
      expect(getTileAtIndex(0, letterIdx)).toHaveStyle({
        backgroundColor: undefined,
      });
    }

    userEvent.keyboard("beads{enter}");

    ["green", "grey", "yellow", "grey", "grey"].forEach(
      (colour: string, letterIdx: number) =>
        expect(getTileAtIndex(0, letterIdx)).toHaveStyle({
          backgroundColor: colour,
        })
    );
  });

  it("should not accept input once all 6 guesses are exhausted", () => {
    mockWordEngine("baton", true);
    render(<Game />);

    userEvent.keyboard("beads{enter}");
    userEvent.keyboard("glean{enter}");
    userEvent.keyboard("ounce{enter}");
    userEvent.keyboard("angel{enter}");
    userEvent.keyboard("basis{enter}");
    userEvent.keyboard("baths{enter}");

    expect(mockedWordEngine.match).toHaveBeenCalledTimes(6);

    userEvent.keyboard("nudge{enter}");

    expect(mockedWordEngine.match).toHaveBeenCalledTimes(6);
  });

  it.todo(
    "should display a toast with text 'Magnificent' if guessed word completely matches chosen word"
  );
  it.todo(
    "should display a toast with text 'Not a valid word' if guessed word is not in dictionary"
  );
  it.todo(
    "should display a toast with text 'Not enough letters' if guessed word has less than 5 alphabets"
  );
  it.todo(
    "should display a toast with text 'Better luck next time' if all 6 guesses are exhausted and word has not been guessed"
  );
});

const getTileAtIndex = (rowIdx: number, columnIdx: number): Element =>
  document.querySelector(
    `[aria-label=guess-word]:nth-child(${
      rowIdx + 1
    }) [aria-label=letter]:nth-child(${columnIdx + 1})`
  )!;

const getAlphabetAtIndex = (rowIdx: number, columnIdx: number): string =>
  getTileAtIndex(rowIdx, columnIdx).textContent!;

const mockWordEngine = (chosenWord: string, useActualMatch = false) => {
  if (useActualMatch) {
    const actualWordEngine = jest.requireActual("../word-engine");
    mockedWordEngine.match.mockImplementation(actualWordEngine.match);
  }
  mockedWordEngine.getRandomWord.mockReturnValueOnce("baton");
};

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

    userEvent.keyboard("a");
    expect(getAlphabetAtIndex(0, 0)).toBe("A");
    userEvent.keyboard("b");
    expect(getAlphabetAtIndex(0, 1)).toBe("B");
    userEvent.keyboard("c");
    expect(getAlphabetAtIndex(0, 2)).toBe("C");
    userEvent.keyboard("d");
    expect(getAlphabetAtIndex(0, 3)).toBe("D");
    userEvent.keyboard("e");
    expect(getAlphabetAtIndex(0, 4)).toBe("E");
  });

  it("should remove alphabet from Wordboard on pressing backspace on Keyboard", () => {
    render(<Game />);

    userEvent.keyboard("a");
    userEvent.keyboard("b");
    userEvent.keyboard("c");
    userEvent.keyboard("d");
    userEvent.keyboard("e");

    userEvent.keyboard("{backspace}");
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

    userEvent.keyboard("{backspace}");
    userEvent.keyboard("{backspace}");
    userEvent.keyboard("{backspace}");
    expect(getAlphabetAtIndex(0, 0)).toBe("");
    expect(getAlphabetAtIndex(0, 1)).toBe("");
    expect(getAlphabetAtIndex(0, 2)).toBe("");
    expect(getAlphabetAtIndex(0, 3)).toBe("");
    expect(getAlphabetAtIndex(0, 4)).toBe("");
  });

  it("should not submit guess word if less than 5 alphabets are entered and enter is pressed", () => {
    render(<Game />);

    userEvent.keyboard("a");
    userEvent.keyboard("b");
    userEvent.keyboard("{enter}");

    // match function is not called
    expect(mockedWordEngine.match).not.toHaveBeenCalled();
  });

  it("should not proceed to next row if less than 5 alphabets are entered and enter is pressed", () => {
    render(<Game />);

    userEvent.keyboard("a");
    userEvent.keyboard("b");
    userEvent.keyboard("{enter}");
    expect(getAlphabetAtIndex(0, 2)).toBe("");

    // next letter input in the same row
    userEvent.keyboard("c");
    expect(getAlphabetAtIndex(0, 2)).toBe("C");
    expect(getAlphabetAtIndex(1, 0)).toBe("");
  });

  it("should submit guess word if 5 alphabets are entered and enter is pressed", () => {
    mockedWordEngine.getRandomWord.mockReturnValueOnce("baton");
    render(<Game />);

    userEvent.keyboard("a");
    userEvent.keyboard("b");
    userEvent.keyboard("c");
    userEvent.keyboard("d");
    userEvent.keyboard("e");
    userEvent.keyboard("{enter}");
    expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
    expect(mockedWordEngine.match).toHaveBeenCalledWith("baton", "abcde");
  });

  it("should not proceed to next row if guess word does not exist in the dictionary", () => {
    render(<Game />);

    userEvent.keyboard("a");
    userEvent.keyboard("b");
    userEvent.keyboard("c");
    userEvent.keyboard("d");
    userEvent.keyboard("e");
    expect(getAlphabetAtIndex(1, 0)).toBe("");
    userEvent.keyboard("{enter}");

    // next letter input not added in next row
    userEvent.keyboard("f");
    expect(getAlphabetAtIndex(1, 0)).toBe("");
  });

  it("should proceed to next row when guessed word is submitted and it exists in dictionary", () => {
    const actualWordEngine = jest.requireActual("../word-engine");
    mockedWordEngine.match.mockImplementationOnce(actualWordEngine.match);
    mockedWordEngine.getRandomWord.mockReturnValueOnce("baton");
    render(<Game />);

    userEvent.keyboard("b");
    userEvent.keyboard("e");
    userEvent.keyboard("a");
    userEvent.keyboard("d");
    userEvent.keyboard("s");
    expect(getAlphabetAtIndex(1, 0)).toBe("");

    userEvent.keyboard("{enter}");

    // next alphabet added in the next row
    userEvent.keyboard("f");
    expect(getAlphabetAtIndex(1, 0)).toBe("F");
  });

  it("should not proceed to next row when guessed word is submitted and is completely matching", () => {
    const actualWordEngine = jest.requireActual("../word-engine");
    mockedWordEngine.match.mockImplementationOnce(actualWordEngine.match);
    mockedWordEngine.getRandomWord.mockReturnValueOnce("baton");

    render(<Game />);

    userEvent.keyboard("b");
    userEvent.keyboard("a");
    userEvent.keyboard("t");
    userEvent.keyboard("o");
    userEvent.keyboard("n");
    expect(getAlphabetAtIndex(1, 0)).toBe("");

    userEvent.keyboard("{enter}");

    expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);

    // next alphabet not added in the next row
    userEvent.keyboard("f");
    expect(getAlphabetAtIndex(1, 0)).toBe("");
  });

  it.todo("should change colour of all letter tiles once word is submitted");

  it.todo("should not accept input once all 6 guesses are exhausted");

  it.todo(
    "should display a toast with text 'Magnificent' if guessed word completely matches chosen word"
  );
  it.todo(
    "should display a toast with text 'Not a valid word' if guessed word is not in dictionary"
  );
  it.todo(
    "should display a toast with text 'Not enough letters' if guessed word has less than 5 alphabets"
  );
});

const getAlphabetAtIndex = (rowIdx: number, columnIdx: number): string =>
  document.querySelector(
    `[aria-label=guess-word]:nth-child(${
      rowIdx + 1
    }) [aria-label=letter]:nth-child(${columnIdx + 1})`
  )?.textContent!;

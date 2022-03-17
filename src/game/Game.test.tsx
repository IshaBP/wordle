import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as wordEngine from "../word-engine";
import { Game } from "./Game";

jest.mock("../word-engine");
const mockedWordEngine = wordEngine as jest.Mocked<typeof wordEngine>;

describe("Game", () => {
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
    expect(mockedWordEngine.match).not.toHaveBeenCalled();
  });

  it.only("should submit guess word if 5 alphabets are entered and enter is pressed", () => {
    mockedWordEngine.getRandomWord.mockReturnValueOnce("check");
    render(<Game />);

    userEvent.keyboard("a");
    userEvent.keyboard("b");
    userEvent.keyboard("c");
    userEvent.keyboard("d");
    userEvent.keyboard("e");
    userEvent.keyboard("{enter}");
    expect(mockedWordEngine.match).toHaveBeenCalledTimes(1);
    expect(mockedWordEngine.match).toHaveBeenCalledWith("check", "abcde");
  });

  it.todo("should submit guess word only if it exists in dictionary");
  it.todo("should proceed to next row when guessed word is partially matching");
  it.todo(
    "should not proceed to next row when guessed word is completely matching"
  );
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

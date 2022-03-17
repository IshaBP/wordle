import { Game } from "./Game";

describe("Game", () => {
  it.todo("should display Wordboard and Keyboard");
  it.todo(
    "should display alphabet on Wordboard on clicking it on on-screen Keyboard"
  );
  it.todo(
    "should remove alphabet from Wordboard on clicking backspace on on-screen Keyboard"
  );
  it.todo("should submit guess word on clicking enter on on-screen Keyboard");
  it.todo("should submit guess word only if it exists in dictionary");
  it.todo("should submit guess word only all 5 alphabets are entered");
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

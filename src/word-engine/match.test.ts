import { match } from "./match";

describe("Match functionality", () => {
  it.todo(
    "should return null chosenWord or guessWord or both are not in dictionary"
  );
  it.todo(
    "should throw an error if chosenWord and guessWord are not of equal length"
  );
  it.todo(
    "should return result of length equal to chosenWord indicating matches"
  );
  it.todo(
    'should return "MATCH" for the places in chosenWord where the letters in guessWord match'
  );
  it.todo(
    'should return "NO_MATCH" for the places in chosenWord where the letters in guessWord do not match'
  );
  it.todo(
    'should return "PARTIAL_MATCH" for the letters which are present in guessWord but at a different position than chosenWord'
  ); // baton, beads
  it.todo(
    "should try to match guessWord only for the as many instances of a letter as are present in chosenWord"
  ); // baths basis
  it.todo('should prioritize "MATCH" more than "PARTIAL_MATCH"'); // baths basis
});

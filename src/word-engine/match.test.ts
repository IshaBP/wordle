import { match } from "./match";

describe("Match functionality", () => {
  it("should return null if chosenWord or guessWord or both are not in dictionary", () => {
    expect(match("abcde", "fghij")).toBeNull();
    expect(match("basis", "fghij")).toBeNull();
    expect(match("abcde", "basis")).toBeNull();
    expect(match("baths", "basis")).not.toBeNull();
  });

  it("should throw an error if chosenWord and guessWord are not of equal length", () => {
    expect(() => match("basis", "background")).toThrow();
  });

  it("should return result of length equal to chosenWord", () => {
    expect(match("basis", "basis")).toHaveLength(5);
  });

  it('should return "MATCH" for the places in chosenWord where the letters in guessWord match', () => {
    expect(match("basis", "basis")).toEqual([
      "MATCH",
      "MATCH",
      "MATCH",
      "MATCH",
      "MATCH",
    ]);
  });

  it('should return "NO_MATCH" for the places in chosenWord where the letters in guessWord do not match', () => {
    expect(match("ounce", "basis")).toEqual([
      "NO_MATCH",
      "NO_MATCH",
      "NO_MATCH",
      "NO_MATCH",
      "NO_MATCH",
    ]);
  });

  it.todo(
    'should return "PARTIAL_MATCH" for the letters which are present in guessWord but at a different position than chosenWord'
  ); // baton, beads
  it.todo(
    "should try to match guessWord only for the as many instances of a letter as are present in chosenWord"
  ); // baths basis
  it.todo('should prioritize "MATCH" more than "PARTIAL_MATCH"'); // baths basis
});

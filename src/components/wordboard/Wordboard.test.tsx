import { Wordboard } from "./Wordboard";

describe("Wordboard", () => {
  it.todo("should have 6 guess words");
  it.todo("should have 5 letter tiles in each guess word");
  it.todo("should colour tile with black if MATCH_STATUS is 'INITIAL'");
  it.todo("should colour tile with green if MATCH_STATUS is 'MATCH'");
  it.todo("should colour tile with yellow if MATCH_STATUS is 'PARTIAL_MATCH'");
  it.todo("should colour tile with grey if MATCH_STATUS is 'NO_MATCH'");
  it.todo("should animate if latest row status is 'INVALID'");

  // Move to toast
  it.todo(
    "should not prompt with 'Not a valid word' if latest row status is 'VALID'"
  );
  it.todo(
    "should prompt with 'Not a valid word' if latest row status is 'INVALID'"
  ); // word length less than 5 or word not in dictionary
});

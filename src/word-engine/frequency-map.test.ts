import { FrequencyMap } from "./frequency-map";

describe("Frequency map", () => {
  it("should initialize frequency map with given word", () => {
    const freqMap = new FrequencyMap("mamma");

    expect(freqMap.get("m")).toEqual(3);
    expect(freqMap.get("a")).toEqual(2);
  });

  it("should be able to decrement frequency of given letter", () => {
    const freqMap = new FrequencyMap("mamma");

    freqMap.decrement("m");
    expect(freqMap.get("m")).toEqual(2);

    freqMap.decrement("a");
    expect(freqMap.get("a")).toEqual(1);
  });

  it("should not decrement frequency of given letter if it is already 0", () => {
    const freqMap = new FrequencyMap("mamma");

    freqMap.decrement("m");
    freqMap.decrement("m");
    freqMap.decrement("m");
    freqMap.decrement("m");
    freqMap.decrement("m");

    expect(freqMap.get("m")).toEqual(0);
  });

  it("should not decrement frequency of given letter if it is not present", () => {
    const freqMap = new FrequencyMap("mamma");

    expect(freqMap.get("b")).toEqual(0);
    freqMap.decrement("b");
    expect(freqMap.get("b")).toEqual(0);
  });

  it.todo("should be able to increment frequency of given letter");

  it.todo(
    "should add the letter and initialize the frequency to 1 if the letter is not already present"
  );

  it.todo(
    "should return true with `has` function if the letter is present with > 0 frequency"
  );

  it.todo("should return frequency with `get` function");
});

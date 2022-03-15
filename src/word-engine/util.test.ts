import { iterateWord } from "./util";

describe("Util", () => {
  describe("Iterate word", () => {
    it("should iterate word", () => {
      const cb = jest.fn();

      iterateWord("smear", cb);

      expect(cb).toHaveBeenCalledWith("s", 0);
      expect(cb).toHaveBeenCalledWith("m", 1);
      expect(cb).toHaveBeenCalledWith("e", 2);
      expect(cb).toHaveBeenCalledWith("a", 3);
      expect(cb).toHaveBeenCalledWith("r", 4);
    });
  });
});

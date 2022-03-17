import { render } from "@testing-library/react";
import { Keyboard } from "./Keyboard";

describe("Keyboard", () => {
  it.concurrent("should display all alphabets", () => {
    const { getAllByRole } = render(<Keyboard />);
    const keys = getAllByRole("button");

    expect(keys).toHaveLength(28);
  });

  it.todo("should display enter and backspace keys");
  it.todo("should display all keys in QWERTY order");
  it.todo(
    "should trigger onKey callback on clicking alphabet, <ENT>, <BKSP> buttons on display"
  );
  it.todo(
    "should trigger onKey callback on typing alphabet, <ENT>, <BKSP> from physical keyboard"
  );
  it.todo(
    "should not trigger onKey callback on typing any keys other than alphabets, <ENT>, <BKSP>"
  );
});

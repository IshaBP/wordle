import { render, getAllByRole } from "@testing-library/react";
import { Keyboard } from "./Keyboard";

describe("Keyboard", () => {
  it.concurrent("should display all keys", () => {
    const { getByRole, getAllByRole } = render(<Keyboard />);
    const keys = getAllByRole("button");

    expect(keys).toHaveLength(28);
    for (let i = 0; i < 26; i++) {
      getByRole("button", { name: String.fromCharCode(65 + i) });
    }
    getByRole("button", { name: "ENTER" });
    getByRole("button", { name: "BK" });
  });

  it.concurrent("should display all keys in QWERTY order", () => {
    const { getAllByLabelText } = render(<Keyboard />);
    const getKeysInRow = (rowIndex: 0 | 1 | 2) => {
      const allRows = getAllByLabelText("key-row");

      return [...getAllByRole(allRows[rowIndex], "button")]
        .map((button) => button.textContent)
        .join(",");
    };

    expect(getKeysInRow(0)).toBe("Q,W,E,R,T,Y,U,I,O,P");
    expect(getKeysInRow(1)).toBe("A,S,D,F,G,H,J,K,L");
    expect(getKeysInRow(2)).toBe("ENTER,Z,X,C,V,B,N,M,BK");
  });

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

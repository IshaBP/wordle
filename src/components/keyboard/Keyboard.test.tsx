import { render, getAllByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Keyboard } from "./Keyboard";

describe("Keyboard", () => {
  it("should display all keys", () => {
    render(<Keyboard onKey={() => {}} />);
    const keys = screen.getAllByRole("button");

    expect(keys).toHaveLength(28);
    iterateAlphabets((alphabet) =>
      screen.getByRole("button", { name: alphabet })
    );
    screen.getByRole("button", { name: "ENTER" });
    screen.getByRole("button", { name: "BK" });
  });

  it("should display all keys in QWERTY order", () => {
    render(<Keyboard onKey={() => {}} />);
    const getKeysInRow = (rowIndex: 0 | 1 | 2) => {
      const allRows = screen.getAllByLabelText("key-row");

      return [...getAllByRole(allRows[rowIndex], "button")]
        .map((button) => button.textContent)
        .join(",");
    };

    expect(getKeysInRow(0)).toBe("Q,W,E,R,T,Y,U,I,O,P");
    expect(getKeysInRow(1)).toBe("A,S,D,F,G,H,J,K,L");
    expect(getKeysInRow(2)).toBe("ENTER,Z,X,C,V,B,N,M,BK");
  });

  it("should trigger onKey callback on clicking alphabet, <ENT>, <BKSP> buttons on display", () => {
    const onKey = jest.fn();
    render(<Keyboard onKey={onKey} />);

    iterateAlphabets((alphabet) => {
      userEvent.click(screen.getByRole("button", { name: alphabet }));
      expect(onKey).toBeCalledWith(alphabet.toLowerCase());
      onKey.mockReset();
    });

    userEvent.click(screen.getByRole("button", { name: "ENTER" }));
    expect(onKey).toBeCalledWith("<ENT>");
    onKey.mockReset();

    userEvent.click(screen.getByRole("button", { name: "BK" }));
    expect(onKey).toBeCalledWith("<BKSP>");
    onKey.mockReset();
  });

  it.todo(
    "should trigger onKey callback on typing alphabet, <ENT>, <BKSP> from physical keyboard"
  );
  it.todo(
    "should not trigger onKey callback on typing any keys other than alphabets, <ENT>, <BKSP>"
  );
});

const iterateAlphabets = (
  callback: (alphabet: string, index: number) => void
) => {
  for (let i = 0; i < 26; i++) {
    callback(String.fromCharCode(65 + i), i);
  }
};

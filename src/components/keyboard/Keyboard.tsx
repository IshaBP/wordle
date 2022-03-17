import { useEffect } from "react";
import { Key } from "./Key";

type KeyRow = Array<KeyCode>;

const keyRows: [KeyRow, KeyRow, KeyRow] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["<ENT>", "z", "x", "c", "v", "b", "n", "m", "<BKSP>"],
];

interface KeyboardProps {
  onKey: (code: KeyCode) => void;
}

const keyCodes = {
  a: "a".charCodeAt(0), // 97
  z: "z".charCodeAt(0), // 122
};

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isValidAlphabetKeyCode = (key: string): key is KeyCode => {
  const code = key.charCodeAt(0);
  return key.length === 1 && keyCodes.a <= code && code <= keyCodes.z;
};

export const Keyboard = ({ onKey }: KeyboardProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "enter") {
        onKey("<ENT>");
      } else if (key === "backspace") {
        onKey("<BKSP>");
      } else if (isValidAlphabetKeyCode(key)) {
        onKey(key);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKey]);

  return (
    <>
      {keyRows.map((keyRow, index) => (
        <KeyRow key={index} keyRow={keyRow} onKey={onKey} />
      ))}
    </>
  );
};

const KeyRow = ({ keyRow, onKey }: { keyRow: KeyRow } & KeyboardProps) => {
  return (
    <div aria-label="key-row">
      {keyRow.map((keyCode) => (
        <Key key={keyCode} code={keyCode} onClick={onKey} />
      ))}
    </div>
  );
};

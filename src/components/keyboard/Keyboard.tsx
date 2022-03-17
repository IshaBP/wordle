import { Key } from "./Key";
import { useKeyPress } from "./useKeyPress";

type KeyRow = Array<KeyCode>;

const keyRows: [KeyRow, KeyRow, KeyRow] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["<ENT>", "z", "x", "c", "v", "b", "n", "m", "<BKSP>"],
];

interface KeyboardProps {
  onKey: (code: KeyCode) => void;
}

export const Keyboard = ({ onKey }: KeyboardProps) => {
  useKeyPress(onKey);

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

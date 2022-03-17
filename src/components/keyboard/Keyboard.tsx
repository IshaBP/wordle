import { Key } from "./Key";

type KeyRow = Array<KeyCode>;

const keyRows: [KeyRow, KeyRow, KeyRow] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["<ENT>", "z", "x", "c", "v", "b", "n", "m", "<BKSP>"],
];

export const Keyboard = () => {
  return (
    <>
      {keyRows.map((keyRow) => (
        <KeyRow keyRow={keyRow} />
      ))}
    </>
  );
};

const KeyRow = ({ keyRow }: { keyRow: KeyRow }) => {
  return (
    <>
      {keyRow.map((keyCode) => (
        <Key key={keyCode} code={keyCode} onClick={() => {}} />
      ))}
    </>
  );
};

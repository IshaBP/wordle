import { Key } from './Key';
import { useKeyPress } from './useKeyPress';

type KeyRow = Array<KeyCode>;

const keyRows: [KeyRow, KeyRow, KeyRow] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['<ENT>', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<BKSP>'],
];

export interface KeyboardProps {
  keyMatchStatusMap: Partial<Record<KeyCode, MatchStatus>>;
  onKey: (code: KeyCode) => void;
}

export const Keyboard = ({ keyMatchStatusMap, onKey }: KeyboardProps) => {
  useKeyPress(onKey);

  return (
    <section aria-label={'keyboard'}>
      {keyRows.map((keyRow, index) => (
        <KeyRow
          key={index}
          keyRow={keyRow}
          onKey={onKey}
          keyMatchStatusMap={keyMatchStatusMap}
        />
      ))}
    </section>
  );
};

const KeyRow = ({
  keyRow,
  keyMatchStatusMap,
  onKey,
}: { keyRow: KeyRow } & KeyboardProps) => {
  return (
    <div aria-label='key-row'>
      {keyRow.map((keyCode) => (
        <Key
          key={keyCode}
          code={keyCode}
          onClick={onKey}
          status={keyMatchStatusMap[keyCode]}
        />
      ))}
    </div>
  );
};

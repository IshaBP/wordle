import { FlexBox } from 'react-styled-flex';
import { Letter, WordboardRow } from './WordboardRow';

const WORD_LENGTH = 5;
const GUESS_COUNT = 6;

export type { Letter };
export type AcceptedRows = Letter[][];
export type CurrentRow = KeyCode[];

export interface WordboardProps {
  acceptedRows: AcceptedRows;
  currentRow: CurrentRow;
}

// TODO: React.memo for Accepted and Empty row
// TODO: Common code extract
export const Wordboard = ({ acceptedRows, currentRow }: WordboardProps) => {
  const remainingRows = GUESS_COUNT - acceptedRows.length;

  return (
    <FlexBox as={'section'} column gap={'0.5rem'} aria-label={'wordboard'}>
      <AcceptedRows acceptedRows={acceptedRows} />
      {remainingRows > 0 && (
        <>
          <CurrentRow currentRow={currentRow} />
          <EmptyRows numberOfRows={remainingRows - 1} />
        </>
      )}
    </FlexBox>
  );
};

const AcceptedRows = ({ acceptedRows }: { acceptedRows: AcceptedRows }) => (
  <>
    {acceptedRows.map((row, rowIdx) => (
      <WordboardRow key={rowIdx} type={'accepted'} row={row} />
    ))}
  </>
);

const CurrentRow = ({ currentRow }: { currentRow: CurrentRow }) => {
  const row: string[] = [
    ...currentRow,
    ...new Array(WORD_LENGTH - currentRow.length).fill(''),
  ];

  return <WordboardRow type={'current'} row={row} />;
};

const EmptyRows = ({ numberOfRows }: { numberOfRows: number }) => {
  const rows: string[][] = Array.from({ length: numberOfRows }, () =>
    new Array(WORD_LENGTH).fill(''),
  );

  return (
    <>
      {rows.map((row, rowIdx) => (
        <WordboardRow key={rowIdx} type={'empty'} row={row} />
      ))}
    </>
  );
};

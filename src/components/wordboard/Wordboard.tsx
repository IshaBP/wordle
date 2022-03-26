import React, { useRef } from 'react';
import { FlexBox } from 'react-styled-flex';
import { useAnimateLetter } from './useAnimateLetter';
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

// TODO: App Accessibility
// TODO: React 18
// TODO: fat-fingers

// TODO: Wrong word animation
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

const AcceptedRows = React.memo(function AcceptedRows({
  acceptedRows,
}: {
  acceptedRows: AcceptedRows;
}) {
  return (
    <>
      {acceptedRows.map((row, rowIdx) => (
        <WordboardRow key={rowIdx} type={'accepted'} row={row} />
      ))}
    </>
  );
});

const CurrentRow = ({ currentRow }: { currentRow: CurrentRow }) => {
  const currentRowRef = useRef<HTMLDivElement>(null);
  useAnimateLetter(currentRowRef, currentRow);

  const row: string[] = [
    ...currentRow,
    ...new Array(WORD_LENGTH - currentRow.length).fill(''),
  ];

  return <WordboardRow ref={currentRowRef} type={'current'} row={row} />;
};

const EmptyRows = React.memo(function EmptyRows({
  numberOfRows,
}: {
  numberOfRows: number;
}) {
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
});

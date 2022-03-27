import React, { useEffect, useRef } from 'react';
import { FlexBox } from 'react-styled-flex';
import { CurrentRowStatus } from '../../game/reducer';
import { useAnimation } from '../useAnimation';
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
  currentRowStatus: CurrentRowStatus;
}

// TODO: App Accessibility
// TODO: React 18
// TODO: fat-fingers

// TODO: Wrong word animation
export const Wordboard = ({
  acceptedRows,
  currentRow,
  currentRowStatus,
}: WordboardProps) => {
  const remainingRows = GUESS_COUNT - acceptedRows.length;

  return (
    <FlexBox as={'section'} column gap={'0.5rem'} aria-label={'wordboard'}>
      <AcceptedRowsComponent acceptedRows={acceptedRows} />
      {remainingRows > 0 && (
        <>
          <CurrentRowComponent
            currentRow={currentRow}
            currentRowStatus={currentRowStatus}
          />
          <EmptyRows numberOfRows={remainingRows - 1} />
        </>
      )}
    </FlexBox>
  );
};

const AcceptedRowsComponent = React.memo(function AcceptedRows({
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

const CurrentRowComponent = ({
  currentRow,
  currentRowStatus,
}: {
  currentRow: CurrentRow;
  currentRowStatus: CurrentRowStatus;
}) => {
  const currentRowRef = useRef<HTMLDivElement>(null);
  useAnimateLetter(currentRowRef, currentRow);
  const [_, animate] = useAnimation();

  const row: string[] = [
    ...currentRow,
    ...new Array(WORD_LENGTH - currentRow.length).fill(''),
  ];

  useEffect(() => {
    if (currentRowStatus === 'INVALID') {
      animate(
        currentRowRef.current,
        [
          { transform: 'translateX(0.5rem)' },
          { transform: 'translateX(-0.5rem)' },
        ],
        { iterations: 4, direction: 'alternate', duration: 100 },
      );
    }
  });

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

import { FlexBox } from 'react-styled-flex';
import styled from 'styled-components';

type Letter = { key: KeyCode; matchStatus: MatchStatus };

const WORD_LENGTH = 5;
const GUESS_COUNT = 6;

export type Row = Letter[]; // TODO: Remove after Game refactor
export type AcceptedRows = Letter[][];
export type CurrentRow = KeyCode[];

export interface WordboardProps {
  acceptedRows: AcceptedRows;
  currentRow: CurrentRow;
}

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
      <FlexBox
        key={rowIdx}
        gap={'0.5rem'}
        aria-label={'guess-word'}
        data-word-type={'accepted'}
      >
        {row.map((letter, letterIdx) => (
          <Letter
            key={letterIdx}
            aria-label={'letter'}
            status={letter.matchStatus}
          >
            {letter.key}
          </Letter>
        ))}
      </FlexBox>
    ))}
  </>
);

const CurrentRow = ({ currentRow }: { currentRow: CurrentRow }) => {
  const row = [
    ...currentRow,
    ...new Array(WORD_LENGTH - currentRow.length).fill(''),
  ];

  return (
    <FlexBox
      gap={'0.5rem'}
      aria-label={'guess-word'}
      data-word-type={'current'}
    >
      {row.map((letter, letterIdx) => (
        <Letter key={letterIdx} aria-label={'letter'}>
          {letter}
        </Letter>
      ))}
    </FlexBox>
  );
};

const EmptyRows = ({ numberOfRows }: { numberOfRows: number }) => {
  const rows: string[][] = Array.from({ length: numberOfRows }, () =>
    new Array(WORD_LENGTH).fill(''),
  );

  return (
    <>
      {rows.map((row, rowIdx) => (
        <FlexBox
          key={rowIdx}
          gap={'0.5rem'}
          aria-label={'guess-word'}
          data-word-type={'empty'}
        >
          {row.map((_, letterIdx) => (
            <Letter key={letterIdx} aria-label={'letter'} />
          ))}
        </FlexBox>
      ))}
    </>
  );
};

const Letter = styled(FlexBox).attrs({ center: true })<{
  status?: MatchStatus;
}>`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ status, theme }) =>
    status ? theme.matchStatus[status] : undefined};
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

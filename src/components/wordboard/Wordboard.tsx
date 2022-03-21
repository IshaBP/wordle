import { FlexBox } from 'react-styled-flex';
import styled from 'styled-components';

type Letter = { key: KeyCode; matchStatus: Exclude<MatchStatus, 'INITIAL'> };

const WORD_LENGTH = 5;
const GUESS_COUNT = 6;

export type Row = Array<Letter>;

export interface WordboardProps {
  acceptedRows: Letter[][];
  currentRow: KeyCode[];
}

export const Wordboard = ({ acceptedRows, currentRow }: WordboardProps) => {
  return (
    <FlexBox as={'section'} column gap={'0.5rem'} aria-label={'wordboard'}>
      <AcceptedRows acceptedRows={acceptedRows} />
      <CurrentRow currentRow={currentRow} />
      <EmptyRows numberOfRows={GUESS_COUNT - acceptedRows.length - 1} />
    </FlexBox>
  );
};

const AcceptedRows = ({
  acceptedRows,
}: {
  acceptedRows: WordboardProps['acceptedRows'];
}) => (
  <>
    {acceptedRows.map((row, rowIdx) => (
      <FlexBox key={rowIdx} aria-label={'guess-word'} gap={'0.5rem'}>
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

const CurrentRow = ({
  currentRow,
}: {
  currentRow: WordboardProps['currentRow'];
}) => {
  const row = [
    ...currentRow,
    ...new Array(WORD_LENGTH - currentRow.length).fill(''),
  ];

  return (
    <FlexBox aria-label={'guess-word'} gap={'0.5rem'}>
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
        <FlexBox key={rowIdx} aria-label={'guess-word'} gap={'0.5rem'}>
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

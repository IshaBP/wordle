import { FlexBox } from 'react-styled-flex';
import styled from 'styled-components';

type Letter =
  | { key: undefined; matchStatus: 'INITIAL' }
  | {
      key: KeyCode;
      matchStatus: Exclude<MatchStatus, 'INITIAL'>;
    };

export type Row = Array<Letter>;

export interface WordboardProps {
  game: Array<Row>;
  latestRowStatus: 'ACCEPTED' | 'IN_PROGRESS' | 'INVALID';
}

export const Wordboard = ({ game, latestRowStatus }: WordboardProps) => {
  return (
    <FlexBox as={'section'} column gap={'0.5rem'} aria-label={'wordboard'}>
      {game.map((guessWord, wordIdx) => (
        <FlexBox key={wordIdx} aria-label={'guess-word'} gap={'0.5rem'}>
          {guessWord.map((letter, letterIdx) => (
            <Letter
              key={letterIdx}
              aria-label={'letter'}
              status={letter.matchStatus}
            >
              {letter.matchStatus === 'INITIAL' ? '' : letter.key.toUpperCase()}
            </Letter>
          ))}
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const Letter = styled(FlexBox).attrs({ center: true })<{ status: MatchStatus }>`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ status, theme }) =>
    status === 'INITIAL' ? undefined : theme.matchStatus[status]};
  font-size: 2rem;
  font-weight: bold;
`;

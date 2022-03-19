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
    <FlexBox as={'section'} column gap={'1rem'} aria-label={'wordboard'}>
      {game.map((guessWord, wordIdx) => (
        <FlexBox key={wordIdx} aria-label={'guess-word'} gap={'1rem'}>
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
  height: 2rem;
  width: 2rem;
  border: 1px solid black;
  padding: 5px;
  background-color: ${({ status }) => {
    if (status === 'MATCH') {
      return 'green';
    } else if (status === 'PARTIAL_MATCH') {
      return 'yellow';
    } else if (status === 'NO_MATCH') {
      return 'grey';
    }
    return undefined;
  }};
`;

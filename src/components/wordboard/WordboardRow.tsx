import { forwardRef } from 'react';
import { FlexBox } from 'react-styled-flex';
import styled, { CSSProperties } from 'styled-components';

type WordboardRowProps =
  | {
      type: 'accepted';
      row: Letter[];
    }
  | {
      type: 'current' | 'empty';
      row: string[];
    };

export type Letter = { key: KeyCode; matchStatus: MatchStatus };

export const WordboardRow = forwardRef<HTMLDivElement, WordboardRowProps>(
  function WordboardRow({ type, row }, ref) {
    return (
      <FlexBox
        ref={ref}
        gap={'0.5rem'}
        aria-label={'guess-word'}
        data-word-type={type}
      >
        {type === 'accepted'
          ? row.map((letter, letterIdx) => (
              <LetterTile
                key={letterIdx}
                aria-label={'letter'}
                status={letter.matchStatus}
              >
                {letter.key}
              </LetterTile>
            ))
          : row.map((letter, letterIdx) => (
              <LetterTile
                key={letterIdx}
                aria-label={'letter'}
                $highlightBorder={type === 'current' && letter !== ''}
              >
                {letter}
              </LetterTile>
            ))}
      </FlexBox>
    );
  },
);

const LetterTile = styled(FlexBox).attrs({ center: true })<{
  status?: MatchStatus;
  $highlightBorder?: boolean;
}>`
  height: 3.5rem;
  width: 3.5rem;
  border: 2px solid
    ${({ $highlightBorder, status, theme }): CSSProperties['borderColor'] => {
      if (status) {
        return 'transparent';
      } else if ($highlightBorder) {
        return theme.borderColor.HIGHLIGHT;
      }
      return theme.borderColor.INITIAL;
    }};
  background-color: ${({ status, theme }) =>
    status ? theme.bgColor[status] : undefined};
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

import { CSSProperties } from 'styled-components';

export const darkTheme: WordleTheme = {
  textColor: '#FFFFFF',
  bgColor: '#000000',
  borderColor: '#3A3A3C',
  matchStatus: {
    INITIAL: '#818384',
    MATCH: '#538D4E',
    NO_MATCH: '#3A3A3C',
    PARTIAL_MATCH: '#B59F3B',
  },
};

export const lightTheme: WordleTheme = {
  textColor: '#000000',
  bgColor: '#FFFFFF',
  borderColor: '#D3D6DA',
  matchStatus: {
    INITIAL: '#D3D6DA',
    MATCH: '#6AAA64',
    NO_MATCH: '#787C7E',
    PARTIAL_MATCH: '#C9B458',
  },
};

export type WordleTheme = {
  textColor: CSSProperties['color'];
  bgColor: CSSProperties['backgroundColor'];
  borderColor: CSSProperties['borderColor'];
  matchStatus: {
    INITIAL: CSSProperties['backgroundColor'];
    MATCH: CSSProperties['backgroundColor'];
    NO_MATCH: CSSProperties['backgroundColor'];
    PARTIAL_MATCH: CSSProperties['backgroundColor'];
  };
};

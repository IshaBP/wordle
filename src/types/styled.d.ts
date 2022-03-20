import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: CSSProperties['color'];
    bgColor: CSSProperties['backgroundColor'];
    borderColor: CSSProperties['borderColor'];
    keyPressBgColor: CSSProperties['backgroundColor'];
    matchStatus: {
      INITIAL: CSSProperties['backgroundColor'];
      MATCH: CSSProperties['backgroundColor'];
      NO_MATCH: CSSProperties['backgroundColor'];
      PARTIAL_MATCH: CSSProperties['backgroundColor'];
      IN_PROGRESS: CSSProperties['backgroundColor']; // TODO: remove once keyboard and wordboard matchStatus are separated
    };
  }
}

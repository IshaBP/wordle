import { createGlobalStyle } from 'styled-components';
import { WordleTheme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: WordleTheme }>`
  html {
    font-family: system-ui;
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    margin: 0;
  }

  .App {
    max-width: 516px;
    margin: auto;
  }
`;

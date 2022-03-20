import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: system-ui;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }

  body {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  .App {
    max-width: 516px;
    margin: auto;
  }

  #root, .App {
    height: 100%;
  }
`;

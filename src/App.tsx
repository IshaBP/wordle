import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import { GlobalStyle } from './GlobalStyles';
import { GameApp } from './GameApp';

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <main className='App'>
        <GameApp />
      </main>
    </ThemeProvider>
  );
};

import { ThemeProvider } from 'styled-components';
import { Game } from './game/Game';
import { darkTheme } from './theme';
import { GlobalStyle } from './GlobalStyles';

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <main className='App'>
        <Game />
      </main>
    </ThemeProvider>
  );
};

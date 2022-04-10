import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import { GlobalStyle } from './GlobalStyles';
import { Game } from './game/Game';

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

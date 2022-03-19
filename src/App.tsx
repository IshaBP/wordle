import { ThemeProvider } from 'styled-components';
import { Game } from './game/Game';
import { darkTheme } from './theme';

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <main className='App'>
        <Game />
      </main>
    </ThemeProvider>
  );
};

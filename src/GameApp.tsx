import { useState } from 'react';
import { Game } from './game/Game';
import { GameState } from './game/reducer';

export const GameApp = () => {
  const [gameKey, setGameKey] = useState(() => Date.now());

  const onGameEnd = (gameStatus: GameState['gameStatus']) => {
    const startNewGame = window.confirm(gameStatus);

    if (startNewGame) {
      setGameKey(Date.now());
    }
  };

  return <Game key={gameKey} onGameEnd={onGameEnd} />;
};

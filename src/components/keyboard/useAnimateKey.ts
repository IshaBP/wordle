import { useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useAnimation } from '../useAnimation';

export const useAnimateKey = () => {
  const theme = useTheme();
  const [isAnimationSupported, animate] = useAnimation();

  return useCallback(
    (keyCode: KeyCode) => {
      if (isAnimationSupported) {
        const keyEl = document.querySelector(
          `[aria-label=keyboard] button[data-code="${keyCode}"]`,
        );
        animate(keyEl, [{ backgroundColor: theme.bgColor.KEY_PRESS }], 100);
      }
    },
    [theme],
  );
};

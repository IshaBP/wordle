import { useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useAnimation } from '../useAnimation';

export const useAnimateKey = () => {
  const theme = useTheme();
  const animate = useAnimation();

  return useCallback(
    (keyCode: KeyCode) => {
      const keyEl = document.querySelector(
        `[aria-label=keyboard] button[data-code="${keyCode}"]`,
      );
      animate(keyEl, [{ backgroundColor: theme.bgColor.KEY_PRESS }], 100);
    },
    [theme],
  );
};

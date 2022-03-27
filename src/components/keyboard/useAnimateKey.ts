import { useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useAnimation } from '../useAnimation';

export const useAnimateKey = () => {
  const theme = useTheme();
  const [isAnimationSupported, animate] = useAnimation();

  return useCallback(
    (keyCode: KeyCode) => {
      if (isAnimationSupported) {
        // isAnimationSupported is also checked in animate. Explicit check here to avoid DOM query and animate try
        const keyEl = document.querySelector(
          `[aria-label=keyboard] button[data-code="${keyCode}"]`,
        );
        animate(keyEl, [{ backgroundColor: theme.bgColor.KEY_PRESS }], 100);
      }
    },
    [animate, isAnimationSupported, theme.bgColor.KEY_PRESS],
  );
};

import { useCallback } from 'react';
import { useTheme } from 'styled-components';

export const useAnimateKey = () => {
  const theme = useTheme();
  return useCallback(
    (keyCode: KeyCode) => {
      if ('animate' in document.body) {
        // Feature Detection - Web Animation API: Animation will not work if browser does not support Web Animation API
        const element: HTMLButtonElement | null = document.querySelector(
          `[aria-label=keyboard] button[data-code="${keyCode}"]`,
        );
        if (element) {
          element.animate([{ backgroundColor: theme.bgColor.KEY_PRESS }], 100);
        }
      }
    },
    [theme],
  );
};

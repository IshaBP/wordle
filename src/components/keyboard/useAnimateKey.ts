import { useTheme } from 'styled-components';

export const useAnimateKey = () => {
  const theme = useTheme();
  return (keyCode: KeyCode) => {
    const element: HTMLButtonElement | null = document.querySelector(
      `[aria-label=keyboard] button[data-code="${keyCode}"]`,
    );
    if (element) {
      element.animate([{ backgroundColor: theme.keyPressBgColor }], 100);
    }
  };
};

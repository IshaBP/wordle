import { RefObject, useEffect, useRef } from 'react';
import { useAnimation } from '../useAnimation';

// TODO: Tests
export const useAnimateLetter = (
  currentRowRef: RefObject<HTMLDivElement>,
  currentRow: string[],
) => {
  const lastAnimatedIdx = useRef(0);
  const [isAnimationSupported, animate] = useAnimation();

  useEffect(() => {
    if (isAnimationSupported && currentRowRef.current) {
      if (currentRow.length === 0) {
        lastAnimatedIdx.current = 0;
      } else if (currentRow.length === lastAnimatedIdx.current + 1) {
        const letter = currentRowRef.current.querySelector(
          `[aria-label=letter]:nth-child(${lastAnimatedIdx.current + 1})`,
        );
        animate(letter, [{ transform: 'scale(1.1)' }], 100);
        lastAnimatedIdx.current += 1;
      } else {
        lastAnimatedIdx.current -= 1;
      }
    }
  }, [currentRowRef, currentRow]);
};

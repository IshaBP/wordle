import { RefObject, useEffect } from 'react';
import { CurrentRowStatus } from '../../game/reducer';
import { useAnimation } from '../useAnimation';

export const useAnimateInvalidSubmission = (
  currentRowRef: RefObject<HTMLDivElement>,
  currentRowStatus: CurrentRowStatus,
) => {
  const [_, animate] = useAnimation();

  useEffect(() => {
    if (currentRowStatus === 'INVALID') {
      animate(
        currentRowRef.current,
        [
          { transform: 'translateX(0.5rem)' },
          { transform: 'translateX(-0.5rem)' },
        ],
        { iterations: 4, direction: 'alternate', duration: 100 },
      );
    }
  });
};

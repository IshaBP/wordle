import { useCallback } from 'react';

type Animation = Parameters<Animatable['animate']>;
export type AnimationKeyframes = Animation[0];
export type AnimationOptions = Animation[1];

export const useAnimation = () => {
  return useCallback(
    (
      element: Element | null,
      keyframes: AnimationKeyframes,
      options: AnimationOptions,
    ) => {
      // Feature Detection - Web Animation API: Animation will not work if browser does not support Web Animation API
      if ('animate' in document.body) {
        if (element) {
          element.animate(keyframes, options);
        }
      }
    },
    [],
  );
};

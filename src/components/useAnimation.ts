import { useCallback } from 'react';

type Animation = Parameters<Animatable['animate']>;
export type AnimationKeyframes = Animation[0];
export type AnimationOptions = Animation[1];
type AnimateFn = (
  element: Element | null,
  keyframes: AnimationKeyframes,
  options: AnimationOptions,
) => void;

export const useAnimation = (): [boolean, AnimateFn] => {
  const isAnimationSupported = 'animate' in document.body;

  const animate = useCallback<AnimateFn>((element, keyframes, options) => {
    // Feature Detection - Web Animation API: Animation will not work if browser does not support Web Animation API
    if (isAnimationSupported) {
      if (element) {
        element.animate(keyframes, options);
      }
    }
  }, []);

  return [isAnimationSupported, animate];
};

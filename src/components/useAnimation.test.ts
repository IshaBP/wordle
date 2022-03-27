import { mockAnimate, restoreMockAnimate } from '../test-utils';
import { renderHook } from '@testing-library/react-hooks';
import { useAnimation } from './useAnimation';

describe('useAnimation', () => {
  afterEach(restoreMockAnimate);

  it('should call browser animate function when supported and element has been provided', () => {
    const browserAnimate = mockAnimate();
    const {
      result: {
        current: [isAnimationSupported, animateFn],
      },
    } = renderHook(useAnimation);

    expect(isAnimationSupported).toBe(true);
    expect(animateFn).toBeInstanceOf(Function);

    animateFn(document.createElement('div'), [], 50);
    expect(browserAnimate).toHaveBeenCalledTimes(1);
  });

  it('should not call browser animate function when it is not supported', () => {
    const browserAnimate = mockAnimate();
    delete Element.prototype.animate;

    const {
      result: {
        current: [isAnimationSupported, animateFn],
      },
    } = renderHook(useAnimation);

    expect(isAnimationSupported).toBe(false);
    expect(animateFn).toBeInstanceOf(Function);

    animateFn(document.createElement('div'), [], 50);
    expect(browserAnimate).not.toHaveBeenCalled();
  });

  it('should not call browser animate function when element has not been provided', () => {
    const browserAnimate = mockAnimate();
    const {
      result: {
        current: [isAnimationSupported, animateFn],
      },
    } = renderHook(useAnimation);

    expect(isAnimationSupported).toBe(true);
    expect(animateFn).toBeInstanceOf(Function);

    animateFn(null, [], 50);
    expect(browserAnimate).not.toHaveBeenCalled();
  });
});

export const mockAnimate = () => {
  const animateFn = jest.fn();
  Object.defineProperty(Element.prototype, 'animate', {
    value: animateFn,
    configurable: true,
  });

  return animateFn;
};

export const restoreMockAnimate = () => {
  const animateFn: Function | undefined = Element.prototype.animate;

  if (animateFn) {
    Object.defineProperty(Element.prototype, 'animate', {
      value: undefined,
      configurable: true,
    });
  }
};

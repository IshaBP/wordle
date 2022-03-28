const originalAnimate = Element.prototype.animate;

export const mockAnimate = () => {
  const animateFn = jest.fn();
  Object.defineProperty(Element.prototype, 'animate', {
    value: animateFn,
    configurable: true,
  });

  return animateFn;
};

export const restoreMockAnimate = () => {
  if (Element.prototype.animate) {
    Object.defineProperty(Element.prototype, 'animate', {
      value: originalAnimate,
      configurable: true,
    });
  }
};

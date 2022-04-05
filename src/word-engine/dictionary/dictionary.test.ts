import { getRandomWord } from './dictionary';

describe('Dictionary', () => {
  describe('getRandomWord', () => {
    it('should return a 5 letter word', () => {
      const word = getRandomWord();

      expect(word).toHaveLength(5);
      expect(typeof word).toBe('string');
    });
  });
});

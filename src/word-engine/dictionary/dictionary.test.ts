import { getRandomWord, isInDictionary } from './dictionary';

describe('Dictionary', () => {
  describe('isInDictionary', () => {
    it('should return true if word is in the base dictionary', () => {
      expect(isInDictionary('allow')).toBe(true);
    });

    it('should return false if word is not in the base dictionary', () => {
      expect(isInDictionary('uuuuu')).toBe(false);
    });
  });

  describe('getRandomWord', () => {
    it('should return a 5 letter word', () => {
      const word = getRandomWord();

      expect(word).toHaveLength(5);
      expect(typeof word).toBe('string');
    });
  });
});

import { FrequencyMap } from './frequency-map';

describe('Frequency map', () => {
  it('should initialize frequency map with given word', () => {
    const freqMap = new FrequencyMap('mamma');

    expect(freqMap.get('m')).toBe(3);
    expect(freqMap.get('a')).toBe(2);
  });

  it('should return true with `has` function if the letter is present with > 0 frequency', () => {
    const freqMap = new FrequencyMap('mamma');

    expect(freqMap.has('m')).toBe(true);

    expect(freqMap.has('z')).toBe(false);

    freqMap.decrement('a');
    freqMap.decrement('a');
    expect(freqMap.has('a')).toBe(false);
  });

  it('should be able to decrement frequency of given letter', () => {
    const freqMap = new FrequencyMap('mamma');

    freqMap.decrement('m');
    expect(freqMap.get('m')).toBe(2);

    freqMap.decrement('a');
    expect(freqMap.get('a')).toBe(1);
  });

  it('should not decrement frequency of given letter if it is already 0', () => {
    const freqMap = new FrequencyMap('mamma');

    freqMap.decrement('m');
    freqMap.decrement('m');
    freqMap.decrement('m');
    freqMap.decrement('m');
    freqMap.decrement('m');

    expect(freqMap.get('m')).toBe(0);
  });

  it('should not decrement frequency of given letter if it is not present', () => {
    const freqMap = new FrequencyMap('mamma');

    expect(freqMap.get('b')).toBe(0);
    freqMap.decrement('b');
    expect(freqMap.get('b')).toBe(0);
  });

  it('should be able to increment frequency of given letter', () => {
    const freqMap = new FrequencyMap('mamma');
    freqMap.increment('m');

    expect(freqMap.get('m')).toBe(4);
  });

  it('should add the letter and initialize the frequency to 1 by `increment` if the letter is not already present', () => {
    const freqMap = new FrequencyMap('mamma');
    freqMap.increment('b');

    expect(freqMap.get('b')).toBe(1);
  });
});

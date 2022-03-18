import { iterateWord } from './util';

/**
 * Map based data structure which stores frequency of letters in a word.
 */
export class FrequencyMap {
  #map = new Map<string, number>();

  /**
   * Initializes the map with letters of the word and the frequency of their occurrence.
   * @param word
   */
  constructor(word: string) {
    iterateWord(word, (letter: string) => {
      this.increment(letter);
    });
  }

  /**
   * Returns true if frequency map has the letter and its frequency is not 0.
   * @param letter
   * @returns boolean
   */
  has(letter: string): boolean {
    return this.#map.has(letter) && this.get(letter) !== 0;
  }

  /**
   * Returns the frequency of the letter if it is present in the map.\
   * Returns 0 if the letter is not present in the map.
   * @param letter
   * @returns
   */
  get(letter: string): number {
    return this.#map.get(letter) ?? 0;
  }

  /**
   * Increments the frequency of the letter if it is present in the map.\
   * Adds the letter in the map and initializes its frequency to 1 if it is not present in the map.
   * @param letter
   */
  increment(letter: string): void {
    if (this.has(letter)) {
      this.#map.set(letter, this.get(letter) + 1);
    } else {
      this.#map.set(letter, 1);
    }
  }

  /**
   * Decrements the frequency of the letter if it is present in the map.\
   * Does nothing if the letter is not present in the map.
   * @param letter
   */
  decrement(letter: string): void {
    if (this.has(letter)) {
      this.#map.set(letter, this.get(letter) - 1);
    }
  }
}

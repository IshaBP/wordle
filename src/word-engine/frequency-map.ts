import { iterateWord } from "./util";

export class FrequencyMap {
  #map = new Map<string, number>();

  constructor(word: string) {
    iterateWord(word, (letter: string) => {
      this.increment(letter);
    });
  }

  has(letter: string): boolean {
    return this.#map.has(letter) && this.get(letter) !== 0;
  }

  get(letter: string): number {
    return this.#map.get(letter) ?? 0;
  }

  increment(letter: string): void {
    if (this.has(letter)) {
      this.#map.set(letter, this.get(letter) + 1);
    } else {
      this.#map.set(letter, 1);
    }
  }

  decrement(letter: string): void {
    if (this.has(letter)) {
      this.#map.set(letter, this.get(letter) - 1);
    }
  }
}

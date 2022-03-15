export class FrequencyMap {
  map = new Map();

  constructor(word: string) {
    for (let idx = 0; idx < word.length; idx++) {
      const letter = word[idx];
      if (this.map.has(letter)) {
        this.map.set(letter, this.map.get(letter) + 1);
      } else {
        this.map.set(letter, 1);
      }
    }
  }

  has(letter: string): boolean {
    return this.map.has(letter) && this.map.get(letter);
  }

  get(letter: string): number {
    return this.map.get(letter) ?? 0;
  }

  decrement(letter: string): void {
    if (this.has(letter)) {
      this.map.set(letter, this.map.get(letter) - 1);
    }
  }
}

export class SessionStorageDataAccess<T extends object> {
  key: string;
  initialData: T;

  constructor(key: string, initialData: T) {
    this.key = key;
    this.initialData = initialData;
  }

  get(): T {
    const sessionData = sessionStorage.getItem(this.key);

    if (sessionData) {
      const data: T = JSON.parse(sessionData);
      return data;
    }

    sessionStorage.setItem(this.key, JSON.stringify(this.initialData));
    return this.initialData;
  }

  set(data: Partial<T>): void {
    const modifiedData = { ...this.get(), ...data };

    sessionStorage.setItem(this.key, JSON.stringify(modifiedData));
  }
}

export class SessionStorageDataAccess<T extends object> {
  constructor(key: string, initialData: T) {}

  get(): T {
    // Get data from session storage
  }

  set(data: Partial<T>) {
    // Set data in session storage
  }
}

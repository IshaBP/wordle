export class SessionStorageDataAccess<T extends object> {
  constructor(initialData: T) {}

  #get() {
    // Get data from session storage
  }

  #set(data: Partial<T>) {
    // Set data in session storage
  }
}

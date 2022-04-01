export const useStorageReducer = <T extends object>(
  reducer: (prevState: T, action: unknown) => T,
  initialState: T,
  storageKey: string,
): [T, (action: unknown) => void] => {
  return [state, dispatch];
};

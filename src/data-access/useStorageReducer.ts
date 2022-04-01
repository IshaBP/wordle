const setSessionData = <T extends object>(storageKey: string, data: T) => {
  sessionStorage.setItem(storageKey, JSON.stringify(data));
};

export const useStorageReducer = <S extends object, A extends unknown>(
  reducer: (prevState: S, action: A) => S,
  initialState: S,
  storageKey: string,
): [S, (action: A) => void] => {
  let state = initialState;

  const dispatch = (action: A) => {
    const newState = reducer(state, action);

    if (!Object.is(state, newState)) {
      state = newState;
      setSessionData(storageKey, state);
    }
  };

  return [state, dispatch];
};

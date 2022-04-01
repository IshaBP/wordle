import { useMemo } from 'react';

const getSessionData = <T extends object>(storageKey: string): T | null => {
  const sessionData = sessionStorage.getItem(storageKey);

  if (sessionData) {
    const data: T = JSON.parse(sessionData);
    return data;
  } else {
    return null;
  }
};

const setSessionData = <T extends object>(storageKey: string, data: T) => {
  sessionStorage.setItem(storageKey, JSON.stringify(data));
};

export const useStorageReducer = <S extends object, A extends unknown>(
  reducer: (prevState: S, action: A) => S,
  initialState: S,
  storageKey: string,
): [S, (action: A) => void] => {
  let state = useMemo(
    () => getSessionData<S>(storageKey) || initialState,
    [initialState, storageKey],
  );

  const dispatch = (action: A) => {
    const newState = reducer(state, action);

    if (!Object.is(state, newState)) {
      state = newState;
      setSessionData(storageKey, state);
    }
  };

  return [state, dispatch];
};

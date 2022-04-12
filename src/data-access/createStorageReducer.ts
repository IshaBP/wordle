import { useEffect } from 'react';

type DispatchStorage<A extends unknown> = (action: A) => void;

// TODO: JsDoc
// TODO: Test
export const createStorageReducer = <S extends object, A extends unknown>(
  reducer: (prevState: S, action: A) => S,
  storageKey: string,
  initialState: S,
): (() => [S, DispatchStorage<A>]) => {
  let state = getSessionData<S>(storageKey) || initialState;

  const dispatch = (action: A) => {
    const newState = reducer(state, action);

    if (!Object.is(state, newState)) {
      state = newState;
      setSessionData(storageKey, newState);
    }
  };

  return function useStorageReducer() {
    useEffect(() => {
      return () => {
        // TODO: Remove.. one day..
        if (process.env.NODE_ENV === 'test') {
          state = initialState;
        }
      };
    }, []);
    return [state, dispatch];
  };
};

/**
 * @param storageKey Key with which data has been stored in session storage.
 * @returns Data if it is present, otherwise returns null.
 */
const getSessionData = <T extends object>(storageKey: string): T | null => {
  const sessionData = sessionStorage.getItem(storageKey);

  if (sessionData) {
    const data: T = JSON.parse(sessionData);
    return data;
  } else {
    return null;
  }
};

/**
 * @param storageKey Key with which data has to be stored in session storage.
 * @param data Data which is to be stored.
 */
const setSessionData = <T extends object>(storageKey: string, data: T) => {
  sessionStorage.setItem(storageKey, JSON.stringify(data));
};

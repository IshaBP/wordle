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

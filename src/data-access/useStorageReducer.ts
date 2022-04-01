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

export const createStorageReducer = <S extends object, A extends unknown>(
  reducer: (prevState: S, action: A) => S,
  initialState: S,
  storageKey: string,
): ((action: A) => void) => {
  let state = getSessionData<S>(storageKey) || initialState;

  const dispatch = (action: A) => {
    const newState = reducer(state, action);

    if (!Object.is(state, newState)) {
      state = newState;
      setSessionData(storageKey, state);
    }
  };

  return function useStorageReducer() {
    return dispatch;
  };
};

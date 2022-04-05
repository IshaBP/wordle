import { useState } from 'react';

export const useMemoOnce = <T>(fn: () => T): T => {
  const [state] = useState(fn);
  return state;
};

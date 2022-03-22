import { useCallback, useRef, useState } from 'react';

type UseSyncState = <T extends {}>(
  initialValue: T,
) => [() => T, (newValue: T) => void];

export const useSyncState: UseSyncState = <T>(initialValue: T) => {
  const valueRef = useRef<T>(initialValue); // To store value, is a container which stores value, ref does not get updated when value changes
  const [_, setValue] = useState<T>(initialValue); // To cause re-render

  return [
    useCallback(() => valueRef.current, [valueRef]),
    useCallback(
      (newValue: T) => {
        valueRef.current = newValue;
        setValue(newValue);
      },
      [valueRef, setValue],
    ),
  ];
};

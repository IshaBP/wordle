import { useEffect } from "react";

export const useKeyPress = (onKey: (code: KeyCode) => void) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "enter") {
        onKey("<ENT>");
      } else if (key === "backspace") {
        onKey("<BKSP>");
      } else if (isValidAlphabetKeyCode(key)) {
        onKey(key);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKey]);
};

const keyCodes = {
  a: "a".charCodeAt(0), // 97
  z: "z".charCodeAt(0), // 122
};

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isValidAlphabetKeyCode = (key: string): key is KeyCode => {
  const code = key.charCodeAt(0);
  return key.length === 1 && keyCodes.a <= code && code <= keyCodes.z;
};

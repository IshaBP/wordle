interface KeyProps {
  code: KeyCode;
  onClick: (code: KeyCode) => void;
}

export const Key = ({ code, onClick }: KeyProps) => {
  const onKeyClick = () => {
    onClick(code);
  };

  return <button onClick={onKeyClick}>{getDisplay(code)}</button>;
};

const getDisplay = (code: KeyCode) => {
  if (code === "<ENT>") {
    return "ENTER";
  } else if (code === "<BKSP>") {
    return "BK";
  } else {
    return code.toUpperCase();
  }
};

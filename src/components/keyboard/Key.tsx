import styled from 'styled-components';

interface KeyProps {
  code: KeyCode;
  status: MatchStatus | undefined;
  onClick: (code: KeyCode) => void;
}

export const Key = ({ code, status, onClick }: KeyProps) => {
  const onKeyClick = () => {
    onClick(code);
  };

  return (
    <KeyButton onClick={onKeyClick} status={status}>
      {getDisplay(code)}
    </KeyButton>
  );
};

const getDisplay = (code: KeyCode) => {
  if (code === '<ENT>') {
    return 'ENTER';
  } else if (code === '<BKSP>') {
    return 'BK';
  } else {
    return code.toUpperCase();
  }
};

const KeyButton = styled.button<{ status: KeyProps['status'] }>`
  height: 3rem;
  min-width: 3rem;
  margin: 0;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: ${({ status, theme }) =>
    status ? theme.matchStatus[status] : theme.matchStatus.INITIAL};
  color: ${({ theme }) => theme.textColor};
  font-weight: bold;
  font-size: 1rem;
`;

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
    <KeyButton
      data-code={code}
      onClick={onKeyClick}
      status={status}
      specialKey={code === '<ENT>' || code === '<BKSP>'}
    >
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

const KeyButton = styled.button<{
  status: KeyProps['status'];
  specialKey: boolean;
}>`
  height: 3.5rem;
  flex: ${({ specialKey }) => (specialKey ? 1.6 : 1)};
  margin: 0;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: ${({ status, theme }) =>
    status ? theme.matchStatus[status] : theme.matchStatus.INITIAL};
  color: ${({ theme }) => theme.textColor};
  font-weight: bold;
  font-size: ${({ specialKey }) => (specialKey ? '0.75rem' : '1rem')};
  cursor: pointer;
  user-select: none;
`;

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
  background-color: ${({ status, theme }) =>
    status ? theme.matchStatus[status] : theme.matchStatus.INITIAL};
`;

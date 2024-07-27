/* eslint-disable @typescript-eslint/no-redeclare */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

const StyledButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 0.5rem;
  background: ${colors.success};
  color: ${colors.background};
  font-weight: 600;
  border: none;
  border-radius: 0.3rem;
`;

interface HistoryButton {
  onClick: (move: number) => void;
  children: ReactNode;
}

export const HistoryButton: FC<HistoryButton> = ({ children, onClick }) => {
  return <StyledButton onClick={() => onClick}>{children}</StyledButton>;
};

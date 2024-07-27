import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSquare = styled.button`
  background: #f3f5f9;
  color: #123;
  border: 1px solid #666;
  font-weight: 700;
  cursor: pointer;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SquareProps {
  onSquareClick: () => void;
  value: string | null;
}

export const Square: FC<SquareProps> = ({ onSquareClick, value }) => {
  return <StyledSquare onClick={onSquareClick}>{value}</StyledSquare>;
};

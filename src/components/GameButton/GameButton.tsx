import {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
} from 'react';
import styled from 'styled-components';

const CustomButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background: rgb(223, 149, 12);
  color: #fff;
  border: none;
  outline: none;
  margin-top: 30px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;

export interface GameButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const GameButton: FC<GameButtonProps> = ({ children, ...props }) => {
  return <CustomButton {...props}>{children}</CustomButton>;
};

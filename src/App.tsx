import React, { FC } from 'react';
import styled from 'styled-components';
import { Board } from './components/Board/Board';
import { BoardFooter } from './components/BorderFooter/BorderFooter';
import './assets/styles/index.css';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  padding: 2rem;
  `;
  
  const AppContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  min-height: 100vh;
  background: #f3f5f9;
`;

export const App: FC = () => {
  return (
    <AppContainerFlex className="App">
      <h1 className="heading">React Tic Tac Toe</h1>
      <BoardContainer>
        <Board />
      </BoardContainer>
      <BoardFooter />
    </AppContainerFlex>
  );
};

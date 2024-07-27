import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Square } from '../Square/Square';
import { GameButton } from '../GameButton/GameButton';
import { HistoryButton } from '../HistoryButton/HistoryButton';
import styles from '../../assets/styles/Board.module.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-template-rows: repeat(3, 60px);
  animation: ${fadeIn} 1s ease-out;
`;

const BoardWrapper = styled.div`
  animation: ${fadeIn} 1s ease-out;
  display: flex;
  justify-content: space-between;
  gap: 10rem;
  @media (max-width: ${1000 - 200}px) {
    flex-direction: column;
    gap: 5rem;
  }
`;

const Status = styled.h3`
  animation: ${fadeIn} 1s ease-out;
`;

const AnimatedSquare = styled(Square)`
  animation: ${bounce} 0.5s ease;
`;

const HistoryList = styled.ol`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  column-gap: 4rem;
  animation: ${fadeIn} 1s ease-out;
`;

const AnimatedGameButton = styled(GameButton)`
  animation: ${bounce} 0.5s ease;
`;

export const Board: React.FC = () => {
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState(true);

  const squares = history[currentMove];
  const winner = calculateWinner(squares);
  const draw = !winner && !squares.includes(null);
  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? 'Draw!'
    : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (index: number) => {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    const newHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const handleResetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const getPlayer = (move: number) => {
    return move % 2 === 0 ? 'Player X' : 'Player O';
  };

  return (
    <BoardWrapper>
      <div className={styles.board__container}>
        <Status>{status}</Status>
        <Container>
          {squares.map((value, index) => (
            <AnimatedSquare
              key={index}
              onSquareClick={() => handleClick(index)}
              value={value}
            />
          ))}
        </Container>
        <AnimatedGameButton type="button" onClick={handleResetGame}>
          Reset Game
        </AnimatedGameButton>
      </div>
      <div className={styles.history}>
        <h4 className={styles.history__title}>Game History</h4>
        <HistoryList>
          {history.map((_, move) => (
            <li className={styles.history__item} key={move}>
              <HistoryButton onClick={() => jumpTo(move)}>
                {move !== null
                  ? `Move #${move} (${getPlayer(move)})`
                  : 'Go to game start'}
              </HistoryButton>
            </li>
          ))}
        </HistoryList>
      </div>
    </BoardWrapper>
  );
};

const calculateWinner = (squares: Array<string | null>): string | null => {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const lines: Array<Array<number>> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

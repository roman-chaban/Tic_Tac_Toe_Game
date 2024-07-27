import React, { useState } from 'react';
import styled from 'styled-components';
import { Square } from '../Square/Square';
import { GameButton } from '../GameButton/GameButton';
import styles from '../../assets/styles/Board.module.css';
import { HistoryButton } from '../HistoryButton/HistoryButton';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
  gap: 5px;
`;

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

const calculateWinner = (squares: Array<string | null>): string | null => {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

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

  return (
    <div className={styles.board__container}>
      <div className={styles.board__squares}>
        <h3>{status}</h3>
        <Container>
          {squares.map((value, index) => (
            <Square
              key={index}
              onSquareClick={() => handleClick(index)}
              value={value}
            />
          ))}
        </Container>
        <GameButton type="button" onClick={handleResetGame}>
          Reset Game
        </GameButton>
      </div>
      <div className={styles.history}>
        <h4>History</h4>
        <ol className={styles.history__buttons}>
          {history.map((_, move) => (
            <li key={move}>
              <HistoryButton onClick={() => jumpTo(move)}>
                {move ? `Player #${move}` : 'Go to game start'}
              </HistoryButton>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

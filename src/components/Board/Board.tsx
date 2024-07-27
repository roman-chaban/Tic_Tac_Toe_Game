/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
  gap: 5px;
`;

const StyledSquare = styled.button`
  background: #f3f5f9;
  color: #123;
  border: 1px solid #666;
  font-weight: 700;
  cursor: pointer;
  font-size: 2rem;
  width: 50px;
  height: 50px;
`;

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

const minimax = (
  squares: Array<string | null>,
  isMaximizing: boolean
): { score: number; index: number } => {
  const availableMoves = squares
    .map((value, index) => (value === null ? index : null))
    .filter((index): index is number => index !== null);

  const winner = calculateWinner(squares);
  if (winner === 'X') return { score: -10, index: -1 };
  if (winner === 'O') return { score: 10, index: -1 };
  if (availableMoves.length === 0) return { score: 0, index: -1 };

  let bestMove = -1;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (const move of availableMoves) {
    const newSquares = squares.slice();
    newSquares[move] = isMaximizing ? 'O' : 'X';

    const { score } = minimax(newSquares, !isMaximizing);

    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }

  return { score: bestScore, index: bestMove };
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
    if (calculateWinner(squares) || squares[index] || !xIsNext) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = 'X';
    const newHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setXIsNext(false);
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

  useEffect(() => {
    if (!xIsNext && !winner && !draw) {
      const { index } = minimax(squares, true);
      if (index !== -1) {
        setTimeout(() => handleClick(index), 500);
      }
    }
  }, [xIsNext, squares, winner, draw]);

  return (
    <>
      <h3>{status}</h3>
      <Container>
        {squares.map((value, index) => (
          <StyledSquare
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!value || winner !== null}
          >
            {value}
          </StyledSquare>
        ))}
      </Container>
      <div>
        <CustomButton type="button" onClick={handleResetGame}>
          Reset Game
        </CustomButton>
      </div>
      <div>
        <h4>History</h4>
        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move ? `Go to move #${move}` : 'Go to game start'}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

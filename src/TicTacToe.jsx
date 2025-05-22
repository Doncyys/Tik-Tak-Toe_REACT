import React, { useState } from 'react';
import './index.css';

const Square = ({ value, onClick }) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner
    ? `Laimėjo: ${winner}`
    : isDraw
      ? 'Lygiosios'
      : `Kitas žaidėjas: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button
        className="reset-button"
        onClick={handleReset}
      >
        Pradėti iš naujo
      </button>
    </div>
  );
};

export default TicTacToe;

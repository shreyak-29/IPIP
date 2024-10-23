import React, { useState, useEffect } from 'react';
import './App.css'; // Optional: add your styles here

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Initialize board with null
  const [xIsNext, setXIsNext] = useState(true); // Track whose turn it is
  const [winner, setWinner] = useState(null); // Track the winner

  // Check for a winner after each move
  useEffect(() => {
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
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]; // Return the winner ('X' or 'O')
        }
      }
      return null; // No winner
    };

    setWinner(calculateWinner(board)); // Set winner if there's one
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return; // Ignore click if cell is filled or game is over
    }
    const newBoard = board.slice(); // Copy the board
    newBoard[index] = xIsNext ? 'X' : 'O'; // Set the cell
    setBoard(newBoard); // Update the board
    setXIsNext(!xIsNext); // Switch turns
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <TicTacToe />
    </div>
  );
}

export default App;

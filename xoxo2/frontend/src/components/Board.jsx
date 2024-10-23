import React, { useState, useEffect } from 'react';
import Square from './Square';
import axios from 'axios';

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const { data } = await axios.get('/api/games/load');
      if (data) {
        setBoard(data.board);
        setIsXNext(data.isXNext);
        setWinner(data.winner);
      }
    };
    fetchGame();
  }, []);

  const handleClick = async (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    const newWinner = calculateWinner(newBoard);

    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(newWinner);

    await axios.post('/api/games/save', {
      board: newBoard,
      isXNext: !isXNext,
      winner: newWinner,
    });
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <h2>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}</h2>
    </div>
  );
};

export default Board;

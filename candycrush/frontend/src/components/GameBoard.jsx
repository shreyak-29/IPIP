// client/src/components/GameBoard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const GameBoard = () => {
    const [board, setBoard] = useState([]); // State to hold the board data
    const [selectedCell, setSelectedCell] = useState(null); // State to hold the selected cell for swapping
    const [error, setError] = useState(''); // State to hold error messages

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/game/defaultUser`);
                setBoard(res.data.board);
            } catch (err) {
                console.error('Error fetching game data:', err);
                setError('Failed to load game data');
            }
        };

        fetchGameData();
    }, []);

    // Function to check for matches in the board
    const checkForMatches = (board) => {
        const matches = [];
        
        // Check for horizontal matches
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length - 2; c++) {
                if (board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2]) {
                    matches.push([r, c], [r, c + 1], [r, c + 2]);
                }
            }
        }

        // Check for vertical matches
        for (let c = 0; c < board[0].length; c++) {
            for (let r = 0; r < board.length - 2; r++) {
                if (board[r][c] === board[r + 1][c] && board[r][c] === board[r + 2][c]) {
                    matches.push([r, c], [r + 1, c], [r + 2, c]);
                }
            }
        }

        return matches;
    };

    // Function to clear matches from the board
    const clearMatches = (matches) => {
        const newBoard = board.map(row => row.slice()); // Create a copy of the board

        // Set matched cells to null or a placeholder
        matches.forEach(([row, col]) => {
            newBoard[row][col] = null; // Clear matched cell
        });

        // Shift down remaining cells
        for (let c = 0; c < newBoard[0].length; c++) {
            for (let r = newBoard.length - 1; r >= 0; r--) {
                if (newBoard[r][c] === null) {
                    // Shift down cells
                    for (let k = r; k > 0; k--) {
                        newBoard[k][c] = newBoard[k - 1][c]; // Move cell down
                    }
                    newBoard[0][c] = Math.floor(Math.random() * 6) + 1; // Generate a new random cell value
                }
            }
        }

        setBoard(newBoard); // Update the state with the new board
    };

    // Function to handle cell click
    const handleCellClick = (rowIndex, cellIndex) => {
        if (selectedCell) {
            // Swap logic if there's already a selected cell
            swapCells(selectedCell.row, selectedCell.cell, rowIndex, cellIndex);
            setSelectedCell(null); // Reset selected cell
        } else {
            // Select the cell
            setSelectedCell({ row: rowIndex, cell: cellIndex });
        }
    };

    // Function to swap cells and check for matches
    const swapCells = (row1, cell1, row2, cell2) => {
        if (Math.abs(row1 - row2) + Math.abs(cell1 - cell2) !== 1) {
            // Ensure cells are adjacent
            return;
        }

        const newBoard = board.map(row => row.slice()); // Create a copy of the board
        // Swap the cells
        [newBoard[row1][cell1], newBoard[row2][cell2]] = [newBoard[row2][cell2], newBoard[row1][cell1]];

        // Check for matches
        const matches = checkForMatches(newBoard);
        if (matches.length > 0) {
            console.log('Matches found:', matches);
            clearMatches(matches); // Clear matches and update board
        } else {
            console.log('No matches found.');
            // You may want to swap back if no matches are found
        }
    };

    // Function to render the game board
    const renderBoard = () => {
        return board.map((row, rowIndex) => (
            <div className="board-row" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <div 
                        className="board-cell" 
                        key={cellIndex} 
                        onClick={() => handleCellClick(rowIndex, cellIndex)}
                    >
                        {cell !== null ? cell : ''} {/* Display cell value or empty if cleared */}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <div className="game-board">
                {board.length > 0 ? renderBoard() : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default GameBoard;

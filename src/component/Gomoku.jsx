import React, { useState, useEffect } from 'react';
import Square from "./Square";

const Gomoku = ({ dimension }) => {
 
  const [squares, setSquares] = useState(
    Array(dimension).fill(Array(dimension).fill(null))
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [theWinner, setTheWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
//

  // chế đọ chơi vs máy 
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
   useEffect(() => {
    if (!xIsNext && isSinglePlayer && !theWinner) {
      setTimeout(makeComputerMove, 500);
    }
   }, [xIsNext, isSinglePlayer, theWinner]);
  //



  const handleClick = (row, col) => {
    if (theWinner || squares[row][col]) {
      return;
    }

    const newSquares = squares.map((row) => [...row]);
    newSquares[row][col] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares, row, col);
    if (winner) {
      setTheWinner(winner);
      setWinningLine(findWinningLine(newSquares, row, col, winner));
    }
  };

  const calculateWinner = (currentSquares, row, col) => {
    const currentPlayer = currentSquares[row][col];

    // Check horizontally
    let count = 1;
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
      count++;
      leftCol--;
    }
    let rightCol = col + 1;
    while (
      rightCol < dimension &&
      currentSquares[row][rightCol] === currentPlayer
    ) {
      count++;
      rightCol++;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    // Check vertically
    count = 1;
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
      count++;
      topRow--;
    }
    let bottomRow = row + 1;
    while (
      bottomRow < dimension &&
      currentSquares[bottomRow][col] === currentPlayer
    ) {
      count++;
      bottomRow++;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    // Check diagonally (top-left to bottom-right)
    count = 1;
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (
      topLeftRow >= 0 &&
      topLeftCol >= 0 &&
      currentSquares[topLeftRow][topLeftCol] === currentPlayer
    ) {
      count++;
      topLeftRow--;
      topLeftCol--;
    }
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (
      bottomRightRow < dimension &&
      bottomRightCol < dimension &&
      currentSquares[bottomRightRow][bottomRightCol] === currentPlayer
    ) {
      count++;
      bottomRightRow++;
      bottomRightCol++;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    // Check diagonally (top-right to bottom-left)
    count = 1;
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (
      topRightRow >= 0 &&
      topRightCol < dimension &&
      currentSquares[topRightRow][topRightCol] === currentPlayer
    ) {
      count++;
      topRightRow--;
      topRightCol++;
    }
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (
      bottomLeftRow < dimension &&
      bottomLeftCol >= 0 &&
      currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer
    ) {
      count++;
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    return null;
  };

  const findWinningLine = (currentSquares, row, col, winner) => {
    const currentPlayer = currentSquares[row][col];
    const lines = [];

    // Check horizontally
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
      lines.push([row, leftCol]);
      leftCol--;
    }
    lines.push([row, col]);
    let rightCol = col + 1;
    while (
      rightCol < dimension &&
      currentSquares[row][rightCol] === currentPlayer
    ) {
      lines.push([row, rightCol]);
      rightCol++;
    }
    if (lines.length >= 5) {
      return lines;
    }

    // Check vertically
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
      lines.push([topRow, col]);
      topRow--;
    }
    lines.push([row, col]);
    let bottomRow = row + 1;
    while (
      bottomRow < dimension &&
      currentSquares[bottomRow][col] === currentPlayer
    ) {
      lines.push([bottomRow, col]);
      bottomRow++;
    }
    if (lines.length >= 5) {
      return lines;
    }

    // Check diagonally (top-left to bottom-right)
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (
      topLeftRow >= 0 &&
      topLeftCol >= 0 &&
      currentSquares[topLeftRow][topLeftCol] === currentPlayer
    ) {
      lines.push([topLeftRow, topLeftCol]);
      topLeftRow--;
      topLeftCol--;
    }
    lines.push([row, col]);
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (
      bottomRightRow < dimension &&
      bottomRightCol < dimension &&
      currentSquares[bottomRightRow][bottomRightCol] === currentPlayer
    ) {
      lines.push([bottomRightRow, bottomRightCol]);
      bottomRightRow++;
      bottomRightCol++;
    }
    if (lines.length >= 5) {
      return lines;
    }

    // Check diagonally (top-right to bottom-left)
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (
      topRightRow >= 0 &&
      topRightCol < dimension &&
      currentSquares[topRightRow][topRightCol] === currentPlayer
    ) {
      lines.push([topRightRow, topRightCol]);
      topRightRow--;
      topRightCol++;
    }
    lines.push([row, col]);
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (
      bottomLeftRow < dimension &&
      bottomLeftCol >= 0 &&
      currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer
    ) {
      lines.push([bottomLeftRow, bottomLeftCol]);
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (lines.length >= 5) {
      return lines;
    }

    return [];
  };

  const renderSquare = (row, col) => {
    const isWinningSquare = winningLine.some(
      ([winRow, winCol]) => winRow === row && winCol === col
    );

    return (
      <Square
        key={col}
        value={squares[row][col]}
        onClick={() => handleClick(row, col)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const renderBoard = () => {
    return squares.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
      </div>
    ));
  };

  const handleRestart = () => {
    setSquares(Array(dimension).fill(Array(dimension).fill(null)));
    setXIsNext(true);
    setTheWinner(null);
    setWinningLine([]);
  };

  let status;
  if (theWinner) {
    status = `Winner: ${theWinner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

//
// chế đọ chơi 2người
/* const makeComputerMove = () => {
    const availableMoves = [];
    squares.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (!squares[rowIndex][colIndex]) {
          availableMoves.push([rowIndex, colIndex]);
        }
      });
    });

    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const [row, col] = availableMoves[randomIndex];
      handleClick(row, col);
    }
  }; */

  // chế độ chơi vs máy 
const makeComputerMove = () => {
  const availableMoves = [];
  const humanPlayer = xIsNext ? 'X' : 'O';
  const computerPlayer = xIsNext ? 'O' : 'X';

  squares.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (!squares[rowIndex][colIndex]) {
        availableMoves.push([rowIndex, colIndex]);
      }
    });
  });

  if (availableMoves.length > 0) {
    // Check if the computer can win in the next move
    for (let i = 0; i < availableMoves.length; i++) {
      const [row, col] = availableMoves[i];
      const newSquares = squares.map((row) => [...row]);
      newSquares[row][col] = computerPlayer;

      if (calculateWinner(newSquares, row, col) === computerPlayer) {
        handleClick(row, col);
        return;
      }
    }

    // Check if the human player can win in the next move
    for (let i = 0; i < availableMoves.length; i++) {
      const [row, col] = availableMoves[i];
      const newSquares = squares.map((row) => [...row]);
      newSquares[row][col] = humanPlayer;

      if (calculateWinner(newSquares, row, col) === humanPlayer) {
        handleClick(row, col);
        return;
      }
    }

    // Choose a random move
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const [row, col] = availableMoves[randomIndex];
    handleClick(row, col);
  }
}; 


// chọn chơi 1 hay 2 ng
 const handleToggleSinglePlayer = () => {
    setIsSinglePlayer(!isSinglePlayer);
    setXIsNext(true);
    setTheWinner(null);
    setWinningLine([]);
    setSquares(Array(dimension).fill(Array(dimension).fill(null)));
  };





  return (
    <div className="board">
      <div className="board-status">
        <div className="status">{status}</div>
        <div className="restart-btn">
          <button onClick={handleRestart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
        </div>
      </div>
      {/* chế độ chơi  */}
 <div className="single-player-toggle">
        <button onClick={handleToggleSinglePlayer}>
          {isSinglePlayer ? 'Play against Human' : 'Play against Computer'}
        </button>
      </div>
      {renderBoard()}
    </div>
  );
};

export default Gomoku;

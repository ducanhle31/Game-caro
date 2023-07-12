import React from "react";

const Square = ({ value, onClick, isWinningSquare }) => {
  const squareStyle = {
    backgroundColor: isWinningSquare ? "yellow" : "white",
    color: value === "X" ? "blue" : "red",
    fontWeight: isWinningSquare ? "bold" : "normal",
  };

  return (
    <div className="squares">
      <button className="square" style={squareStyle} onClick={onClick}>
        {value}
      </button>
    </div>
  );
};

export default Square;

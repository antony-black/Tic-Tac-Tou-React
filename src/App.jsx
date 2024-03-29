import React from "react";
import { useState, useEffect } from "react";
import { WinLines } from "./constants/GameConfig";
import Rows from "./components/Rows";
import Restart from "./components/Restart";
import Status from "./components/Status";
import "./index.scss";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setXTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const handleClick = (currentSquare) => {
    let copySquares = [...squares];
    if (copySquares[currentSquare]) return;
    copySquares[currentSquare] = isXTurn ? "X" : "0";
    setXTurn(!isXTurn);
    setSquares(copySquares);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(""));
    setXTurn(true);
    setDisabled(false);
  };

  const getWinner = (squares) => {
    for (let i = 0; i < WinLines.length; i++) {
      const [x, y, z] = WinLines[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }

    return null;
  };

  useEffect(() => {
    if (!getWinner(squares) && squares.every((square) => square !== "")) {
      setGameStatus(`There is no a winner. It's a draw. Let's play again!`);
    } else if (getWinner(squares)) {
      setDisabled(true);
      setGameStatus(
        `There is the winner, ${getWinner(squares)}. Let's play again!`
      );
    } else {
      setGameStatus(`Next step by ${isXTurn ? "X" : "0"}`);
    }
  }, [squares, isXTurn]);

  return (
    <div className="main-container">
      <Rows
        squares={squares}
        handleClick={handleClick}
        isDisabled={isDisabled}
      />
      <Status gameStatus={gameStatus} />
      <Restart handleRestart={handleRestart} />
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { WinLines } from "./constants/GameConfig";
import Rows from "./components/Rows";
import "./index.scss";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setXTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("");

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
      setGameStatus(
        `There is the winner, ${getWinner(squares)}. Let's play again!`
      );
    } else {
      setGameStatus(`Next step by ${isXTurn ? "X" : "0"}`);
    }
  }, [squares, isXTurn]);

  return (
    <div className="main-container">
      <Rows squares={squares} handleClick={handleClick} />
      <h2 className="game-status">{gameStatus}</h2>
      <button className="restart" onClick={handleRestart}>
        RESTART
      </button>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { WinLines } from "./constants/GameConfig";
import "./index.scss";

function Square({value, onClick}) {
  return (
    <button className="square" onClick={onClick}>{value}</button>
  )
}

export default function App() {
  const [gameStatus, setGameStatus] = useState('');
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

// 0 1 2
// 3 4 5
// 6 7 8

  const handleClick = (currentSquare) => {
    let copySquares = [...squares];
    if (copySquares[currentSquare]) return;
    copySquares[currentSquare] = isXTurn ? 'X' : '0';
    setIsXTurn(!isXTurn);
    setSquares(copySquares);
  }

  const handleRestart = () => {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  }

  const getWinner = (squares) => {
    for (let i = 0; i < WinLines.length; i++) {
      const [x,y,z] = WinLines[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
        ) {
          return squares[x];
        }
    }
    return null;
  }

  useEffect(() => {
    if(!getWinner(squares) && squares.every(square => square !== "")) {
      setGameStatus(`This is a draw ! Please restart the game`);
    } else if (getWinner(squares)) {
      setGameStatus(`The winner is ${getWinner(squares)}! Restart the game!`)
    } else {
      setGameStatus(`Next player is ${isXTurn ? 'X' : '0'}`);
    }
  },[squares, isXTurn])

  return <div className="main-container">
  <div className="rows">
  <div className="row">
    <Square value={squares[0]} onClick={() => handleClick(0)}/>
    <Square value={squares[1]} onClick={() => handleClick(1)}/>
    <Square value={squares[2]} onClick={() => handleClick(2)}/>
   </div>
   <div className="row">
    <Square value={squares[3]} onClick={() => handleClick(3)}/>
    <Square value={squares[4]} onClick={() => handleClick(4)}/>
    <Square value={squares[5]} onClick={() => handleClick(5)}/>
   </div>
   <div className="row">
    <Square value={squares[6]} onClick={() => handleClick(6)}/>
    <Square value={squares[7]} onClick={() => handleClick(7)}/>
    <Square value={squares[8]} onClick={() => handleClick(8)}/>
   </div>
  </div>

   <h2 className="game-status">{gameStatus}</h2>
   <button className="restart" onClick={handleRestart}>RESTART</button>
  </div>;
}
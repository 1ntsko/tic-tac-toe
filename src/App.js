import React, { useState } from 'react';
import './App.css';


const winingLines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function App() {
  return (
    <div className="App">
        <Board />
    </div>
  );
}

export default App;


function Board() {
  let winningCells = [];
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = index => {
    const squares = [...boardSquares];
    if (calculateWinner(boardSquares) || squares[index]) return;
    
    squares[index] = xIsNext ? "X" : "0";

    setBoardSquares(squares);
    setXIsNext(!xIsNext)
  };

  const renderSquare = (index) => {
    return <td key={index} className={winningCells.includes(index) ? 'line' : ''} value={boardSquares[index]} onClick={() => handleClick(index)}>{boardSquares[index]}</td>
  }

  const addLine = () => {
    let winningCoords = [];
    let includes;
    boardSquares.forEach((el, idx) => {
      if (winner === el)  
      winningCoords.push(idx)
     });

     for (let i=0; i < winingLines.length; i++) {
       for (let j = 0; j < winingLines[i].length; j++) {
         if (!winningCoords.includes(winingLines[i][j])) {
          includes = false;
          break;
         } 
       }
       if(includes) {
        winningCells = winingLines[i];
         break;
       } 
       includes = true;
    }

  }

  let status;
  const winner = calculateWinner(boardSquares);
  status = winner ? `Winner is: ${winner}` : `Next player: ${xIsNext ? "X" : "0"}`;
  if(winner === "X" || winner === "0") addLine();


  return (
    <div className="container">
        <div className="heading">
          <h1>Tic Tac Toe</h1>
          <div className="underline"></div>
        </div>
        <div>{status}</div>
        <table>
        <thead></thead>
        <tbody>
          { [1, 2, 3].map(row => <tr key={row}>{ [3, 2, 1].map(col => renderSquare(row * 3 - col)) }</tr>) }
        </tbody>
        </table>
          <div className="buttons">
            <button className="new-game" onClick={() => setBoardSquares(Array(9).fill(null))}>New Game</button>
            <button className="history">History</button>
          </div>
      </div>
  )
}

function calculateWinner(squares) {
  for (let i=0; i < winingLines.length; i++) {
    const [a, b, c] = winingLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
} 
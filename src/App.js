import { useState } from "react";

function Board( {xIsNext, squares, onPlay } ) {

  function HandleClick(i) {

    const nextSquares = squares.slice();

    if (squares[i] || CalculateWinner(squares)){ // early return if square already has
                                                 // value or if winner was found
      return;
    }

    if (xIsNext){
      nextSquares[i] = "X";
    }
    else nextSquares[i] = "O";

    onPlay(nextSquares);
  }

    const winner = CalculateWinner(squares);
    let status;
    if (winner){
      status = 'winner: ' + winner;
    }  else {
       status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    } 
    
    return (
      <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} squareClick = { () =>HandleClick(0)}/>
        <Square value = {squares[1]} squareClick = { () =>HandleClick(1)}/>
        <Square value = {squares[2]} squareClick = { () =>HandleClick(2)}/>
      </div>

      <div className="board-row">
        <Square value = {squares[3]} squareClick = { () =>HandleClick(3)}/>
        <Square value = {squares[4]} squareClick = { () =>HandleClick(4)}/>
        <Square value = {squares[5]} squareClick = { () =>HandleClick(5)}/>
      </div>
      
      <div className="board-row">
        <Square value = {squares[6]} squareClick = { () =>HandleClick(6)}/>
        <Square value = {squares[7]} squareClick = { () =>HandleClick(7)}/>
        <Square value = {squares[8]} squareClick = { () =>HandleClick(8)}/>
      </div>
    </>
  );
}

function CalculateWinner(squares){ 
  const lines = [
    // 8 possible win combinations
    [0,1,2], // row 1 ___
    [3,4,5], // row 2 ___
    [6,7,8], // row 3 ___
    [0,3,6], // column 1 |
    [1,4,7], // column 2 |
    [2,5,8], // column 3 |
    [0,4,8], // diaganol 1 \
    [6,4,2]  // diagonal 2 /
  ];
  
  for (let i = 0; i<lines.length; i++){
    const [a,b,c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
        return squares[a];
      }
  }
  return null;
}

function Square({ value, squareClick }){
  return (
    <button className="square" onClick={squareClick}>
      {value}
    </button>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
   setHistory(nextHistory);
   setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0){
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to move #0';
    }
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)} >{description}</button>
      </li>
    );
  });


return (
  <div className="game">
    <div className="game-board">
      <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay} />
    </div>
    <div className="game-info">
      <ol> {moves} </ol>
    </div>
  </div>
);
}
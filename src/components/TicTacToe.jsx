import React, { useEffect, useState } from "react";
import x from "../assets/x.jpg";
import o from "../assets/0.png";
function TicTacToe() {
  const [count, setCount] = useState(0);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [lock, setLock] = useState(false);
  useEffect(() => {
    const winner = checkWin(board);
    if (winner) {
      setLock(true);
    }
  }, [board]);
  const inputI = (idx) => {
    if (board[idx] === "" && !lock) {
      const newBoard = [...board];
      newBoard[idx] = count % 2 === 0 ? "x" : "o";
      setBoard(newBoard);
      setCount(count + 1);
    }
  };
  const reset = () => {
    setCount(0);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setLock(false);
  };
  const checkWin = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const winner = checkWin(board);
  const drawCheck=() => {
    if (count === 9) {
      return true;
    }
    return false;
  };
  const draw = drawCheck();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className=" text-4xl text-zinc-700 p-8">Tic Tac Toe</div>
      <div className="w-[520px] h-[520px] bg-red-400 rounded-xl flex justify-between p-4 flex-wrap">
        {board.map((value, idx) => (
          <div
            key={idx}
            onClick={() => inputI(idx)}
            className="w-[150px] h-[150px] bg-white rounded-xl"
          >
            {value === "x" && <img src={x} alt="X" />}
            {value === "o" && <img src={o} alt="O" />}
          </div>
        ))}
      </div>
      {winner && <div className="m-10">{winner.toUpperCase()} wins!</div>}
      {draw && !winner && <div className="m-10"> Draw !</div>}
      <div>
        <button onClick={reset} className=" p-3 rounded-xl border bg-green-300">
          Reset
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;

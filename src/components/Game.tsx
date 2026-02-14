import { useState } from 'react';
import { Board } from './Board';

type SquareValue = string | null;

interface GameState {
  squares: SquareValue[];
  xIsNext: boolean;
}

function calculateWinner(squares: SquareValue[]): { winner: string; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function isBoardFull(squares: SquareValue[]): boolean {
  return squares.every((square) => square !== null);
}

export function Game() {
  const [history, setHistory] = useState<GameState[]>([
    { squares: Array(9).fill(null), xIsNext: true },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  const result = calculateWinner(current.squares);
  const winner = result?.winner;
  const winningLine = result?.line ?? null;
  const isDraw = !winner && isBoardFull(current.squares);

  const handleClick = (i: number) => {
    if (current.squares[i] || winner) {
      return;
    }

    const newSquares = current.squares.slice();
    newSquares[i] = current.xIsNext ? 'X' : 'O';

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([
      ...newHistory,
      { squares: newSquares, xIsNext: !current.xIsNext },
    ]);
    setCurrentMove(newHistory.length);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null), xIsNext: true }]);
    setCurrentMove(0);
  };

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${current.xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-content">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={handleClick}
            winningLine={winningLine}
          />
        </div>
        <div className="game-info">
          <div className={`status ${winner ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>
            {status}
          </div>
          <button className="reset-button" onClick={resetGame}>
            New Game
          </button>
          <div className="history">
            <h3>History</h3>
            <ol>
              {history.map((_, move) => (
                <li key={move}>
                  <button
                    className={move === currentMove ? 'current' : ''}
                    onClick={() => jumpTo(move)}
                  >
                    {move === 0 ? 'Start' : `Move #${move}`}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning: boolean;
}

export function Square({ value, onClick, isWinning }: SquareProps) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

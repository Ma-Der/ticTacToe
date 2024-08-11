export const calculateWinner = (
  board: Array<string | null>,
  size: number
): string | null => {
  const lines = getWinningLines(size);

  for (let line of lines) {
    const [a, b, c, ...rest] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c] &&
      rest.every((i) => board[a] === board[i])
    ) {
      return board[a];
    }
  }
  return null;
};

function getWinningLines(size: number): number[][] {
  const lines: number[][] = [];

  // Vertical and horizontal lines
  for (let i = 0; i < size; i++) {
    const row = Array.from({ length: size }, (_, k) => i * size + k);
    const column = Array.from({ length: size }, (_, k) => i + k * size);
    lines.push(row, column);
  }

  // Diagonal lines
  const diagonal1 = Array.from({ length: size }, (_, k) => k * size + k);
  const diagonal2 = Array.from(
    { length: size },
    (_, k) => (k + 1) * size - (k + 1)
  );
  lines.push(diagonal1, diagonal2);

  return lines;
}

export const createEmptyBoard = (size: number): Array<string | null> =>
  Array(size * size).fill(null);

export const waitFor = async (time: number) =>
  new Promise((r) => setTimeout(r, time));

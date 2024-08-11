export type TicTacToeContext = {
  size: number;
  board: Array<string | null>;
  xIsNext: boolean;
  winner: string | null;
};

export type TicTacToeEvent =
  | { type: "MAKE_MOVE"; index: number }
  | { type: "RESET" }
  | { type: "SET_SIZE"; size: number };

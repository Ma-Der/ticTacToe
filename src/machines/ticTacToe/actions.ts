import { AnyEventObject, assign } from "xstate";
import { createEmptyBoard } from "../../utils/utils";
import { TicTacToeContext } from "./types";

export const makeMove = assign({
  board: ({
    context,
    event,
  }: {
    context: TicTacToeContext;
    event: AnyEventObject;
  }) => {
    const newBoard = context.board.slice();
    newBoard[(event as { type: "MAKE_MOVE"; index: number }).index] =
      context.xIsNext ? "X" : "O";
    return newBoard;
  },
  xIsNext: ({ context }: { context: TicTacToeContext }) => !context.xIsNext,
});

export const resetGame = assign({
  board: ({ context }: { context: TicTacToeContext }) =>
    createEmptyBoard(context.size),
  xIsNext: () => true,
  winner: () => null,
});

export const setSize = assign({
  size: ({
    context,
    event,
  }: {
    context: TicTacToeContext;
    event: AnyEventObject;
  }) => event.size,
  board: ({
    context,
    event,
  }: {
    context: TicTacToeContext;
    event: AnyEventObject;
  }) => createEmptyBoard(event.size),
  xIsNext: () => true,
  winner: () => null,
});

export const setWinner = assign({
  winner: ({ context }: { context: TicTacToeContext }) =>
    !context.xIsNext ? "X" : "O",
});

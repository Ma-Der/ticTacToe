import { AnyEventObject } from "xstate";
import { calculateWinner } from "../../utils/utils";
import { TicTacToeContext } from "./types";

export const isWinningMove = ({
  context,
  event,
}: {
  context: TicTacToeContext;
  event: AnyEventObject;
}): boolean => {
  const { board, size } = context;
  const newBoard = board.slice();
  if (!event.index) return false;
  newBoard[event.index] = context.xIsNext ? "X" : "O";
  return calculateWinner(newBoard, size) !== null;
};

export const isDraw = ({
  context,
  event,
}: {
  context: TicTacToeContext;
  event: AnyEventObject;
}): boolean => {
  const { board, size } = context;
  const newBoard = board.slice();
  if (!event.index) return false;
  newBoard[event.index] = context.xIsNext ? "X" : "O";
  return calculateWinner(newBoard, size) === null && !newBoard.includes(null);
};

import { createMachine } from "xstate";
import { isWinningMove, isDraw } from "./guards";
import { createEmptyBoard } from "../../utils/utils";
import { TicTacToeContext, TicTacToeEvent } from "./types";
import { makeMove, resetGame, setSize, setWinner } from "./actions";

export const ticTacToeMachine = createMachine(
  {
    types: {} as { context: TicTacToeContext; event: TicTacToeEvent },
    context: {
      size: 3,
      board: createEmptyBoard(3),
      xIsNext: true,
      winner: null,
    },
    initial: "playing",
    states: {
      playing: {
        on: {
          MAKE_MOVE: [
            {
              target: "won",
              guard: "isWinningMove",
              actions: ["makeMove", "setWinner"],
            },
            {
              target: "draw",
              guard: "isDraw",
              actions: "makeMove",
            },
            {
              actions: "makeMove",
            },
          ],
          RESET: {
            target: "playing",
            actions: "resetGame",
          },
          SET_SIZE: {
            target: "playing",
            actions: "setSize",
          },
        },
      },
      won: {
        on: {
          RESET: {
            target: "playing",
            actions: "resetGame",
          },
          SET_SIZE: {
            target: "playing",
            actions: "setSize",
          },
        },
      },
      draw: {
        on: {
          RESET: {
            target: "playing",
            actions: "resetGame",
          },
          SET_SIZE: {
            target: "playing",
            actions: "setSize",
          },
        },
      },
    },
  },
  {
    actions: {
      makeMove,
      resetGame,
      setSize,
      setWinner,
    },
    guards: {
      isWinningMove,
      isDraw,
    },
  }
);

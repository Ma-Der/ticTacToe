import { createActor } from "xstate";
import { ticTacToeMachine } from "./machine";
import { waitFor } from "../../utils/utils";

describe("board", () => {
  const initialSize = 3;
  const initialBoardSize = initialSize * initialSize;
  const fsm = createActor(ticTacToeMachine);
  fsm.start();

  it("size should be 9 at start", async () => {
    const initialBoardLength = 9;

    const boardLength = fsm.getSnapshot().context.board.length;
    await waitFor(500);

    expect(boardLength).toBe(initialBoardLength);
  });
  it("should be empty at start", async () => {
    fsm.send({ type: "SET_SIZE", size: initialSize });
    await waitFor(500);

    const boardEmptyArray = Array(initialBoardSize).fill(null);

    expect(fsm.getSnapshot().context.board).toStrictEqual(boardEmptyArray);
  });
  it("should have one field not null after one click", async () => {
    const firstFieldClicked = 0;
    const playerXClickedSign = "X";

    fsm.send({ type: "MAKE_MOVE", index: firstFieldClicked });
    await waitFor(500);

    const firstBoardField = fsm.getSnapshot().context.board[firstFieldClicked];

    expect(firstBoardField).toBe(playerXClickedSign);
  });
  it("should be empty after clicking RESET button", async () => {
    const fsm2 = createActor(ticTacToeMachine);
    fsm2.start();

    const firstFieldClicked = 0;
    const playerXClickedSign = "X";

    fsm2.send({ type: "MAKE_MOVE", index: firstFieldClicked });
    await waitFor(500);

    const firstBoardField = fsm2.getSnapshot().context.board[firstFieldClicked];
    await waitFor(200);

    expect(firstBoardField).toBe(playerXClickedSign);

    fsm2.send({ type: "RESET" });
    await waitFor(500);

    const boardEmptyArray = Array(initialBoardSize).fill(null);

    const emptyBoard = fsm2.getSnapshot().context.board;
    await waitFor(200);

    expect(emptyBoard).toStrictEqual(boardEmptyArray);
  });
  it("should be 16 long after setting size to 4", async () => {
    const fsm2 = createActor(ticTacToeMachine);
    fsm2.start();

    const pickedSize = 4;
    const expectedBoardLength = pickedSize * pickedSize;

    fsm2.send({ type: "SET_SIZE", size: pickedSize });
    await waitFor(200);

    const boardLength = fsm2.getSnapshot().context.board.length;

    expect(boardLength).toBe(expectedBoardLength);
  });
});

describe("player X", () => {
  it("should win after getting X in every field in first row", () => {
    // to win in first row, board indexes (0, 1, 2) should have 'X' instead of null
    const predictedPlayerWin = "X";
    const fsm2 = createActor(ticTacToeMachine);
    fsm2.start();
    // player X move
    fsm2.send({ type: "MAKE_MOVE", index: 0 });
    //player O move
    fsm2.send({ type: "MAKE_MOVE", index: 4 });
    //player X move
    fsm2.send({ type: "MAKE_MOVE", index: 1 });
    // player O move
    fsm2.send({ type: "MAKE_MOVE", index: 7 });
    //player X move
    fsm2.send({ type: "MAKE_MOVE", index: 2 });

    const playerXWin = fsm2.getSnapshot().context.winner;

    expect(predictedPlayerWin).toBe(playerXWin);
  });
  it("should draw after none of horizontal, vertical and diagonal lines are not X or O", async () => {
    const fsm2 = createActor(ticTacToeMachine);
    fsm2.start();

    // player X move
    fsm2.send({ type: "MAKE_MOVE", index: 0 });
    //player O move
    fsm2.send({ type: "MAKE_MOVE", index: 1 });
    //player X move
    fsm2.send({ type: "MAKE_MOVE", index: 2 });
    // player O move
    fsm2.send({ type: "MAKE_MOVE", index: 4 });
    //player X move
    fsm2.send({ type: "MAKE_MOVE", index: 3 });
    // player O move
    fsm2.send({ type: "MAKE_MOVE", index: 5 });
    //player X move
    fsm2.send({ type: "MAKE_MOVE", index: 7 });
    // player O move
    fsm2.send({ type: "MAKE_MOVE", index: 6 });
    //player X move
    fsm2.send({ type: "MAKE_MOVE", index: 8 });

    const winner = fsm2.getSnapshot().context.winner;

    expect(winner).toBeNull();
  });
});

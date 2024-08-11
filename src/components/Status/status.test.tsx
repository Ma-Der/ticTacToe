import { render, screen, fireEvent } from "@testing-library/react";
import { Status } from "./status";
import { createActor } from "xstate";
import { ticTacToeMachine } from "../../machines/ticTacToe";
import { waitFor } from "../../utils/utils";

const mockedHandleReset = jest.fn();

describe("status", () => {
  it("should render same text passed into status prop", async () => {
    const initializedStatus = "Status";

    render(
      <Status status={initializedStatus} handleReset={mockedHandleReset} />
    );

    const spanElement = screen.getByText(/status/i);

    expect(spanElement).toBeInTheDocument();
  });
  it("reset button clicked should reset board", async () => {
    const fsm = createActor(ticTacToeMachine);
    fsm.start();
    const initializedStatus = "Status";
    const handleReset = () => {
      fsm.send({ type: "RESET" });
    };
    render(<Status status={initializedStatus} handleReset={handleReset} />);

    const firstBoardTile = 0;
    fsm.send({ type: "MAKE_MOVE", index: firstBoardTile });
    await waitFor(200);

    const notEmptyBoard = fsm.getSnapshot().context.board;

    const boardWithoutOnlyNullValues = notEmptyBoard.every(
      (tile) => tile === null
    );

    if (boardWithoutOnlyNullValues) {
      throw new Error("board is empty and it should not be");
    }

    const buttonElement = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(buttonElement);

    const board = fsm.getSnapshot().context.board;
    await waitFor(200);

    const boardShouldHaveOnlyNullValues = board.every((tile) => tile === null);

    expect(boardShouldHaveOnlyNullValues).toBeTruthy();
  });
});

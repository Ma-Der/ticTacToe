import { render, screen, fireEvent } from "@testing-library/react";
import { Square } from "./square";
import { createActor } from "xstate";
import { ticTacToeMachine } from "../../machines/ticTacToe";

const mockedOnClick = jest.fn();

describe("square", () => {
  it("should render same text passed into square prop", async () => {
    const initializedValue = "X";

    render(<Square value={initializedValue} onClick={mockedOnClick} />);

    const buttonElement = screen.getByText(/x/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("should render button without text when value is null", async () => {
    render(<Square value={null} onClick={mockedOnClick} />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement.textContent).toBeFalsy();
  });

  it("should render X after clicking button", async () => {
    const boardTileIndex = 0;
    const fsm = createActor(ticTacToeMachine);
    fsm.start();

    const fsmContext = fsm.getSnapshot().context;
    const fsmMatchesPlaying = fsm.getSnapshot().matches("playing");

    const onClick = () => {
      if (!fsmContext.board[boardTileIndex] && fsmMatchesPlaying) {
        fsm.send({ type: "MAKE_MOVE", index: boardTileIndex });
      }
    };
    render(<Square value={null} onClick={onClick} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const valueAfterClick = fsm.getSnapshot().context.board[0];

    // re-render same square with value after click

    render(<Square value={valueAfterClick} onClick={onClick} />);

    const buttonElementAfterClick = screen.getByText("X");

    const expectedTextAfterClickingButton = "X";

    expect(buttonElementAfterClick.textContent).toBe(
      expectedTextAfterClickingButton
    );
  });
});

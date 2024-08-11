import { render, screen } from "@testing-library/react";
import { Board } from "./board";
import { createEmptyBoard } from "../../utils/utils";

const mockedOnClick = jest.fn();

describe("board", () => {
  const initializedSize = 3;
  const initializedBoard = createEmptyBoard(initializedSize);

  it("should render 3x3 buttons", async () => {
    render(
      <Board
        size={initializedSize}
        board={initializedBoard}
        onClick={mockedOnClick}
      />
    );
    const expectedNumberOfButtonsRendered = initializedSize * initializedSize;
    const buttonsLength = screen.getAllByRole("button").length;

    expect(buttonsLength).toBe(expectedNumberOfButtonsRendered);
  });
  it("should render 3x3 empty buttons", async () => {
    render(
      <Board
        size={initializedSize}
        board={initializedBoard}
        onClick={mockedOnClick}
      />
    );

    const buttons = screen.getAllByRole("button");

    const allButtonsEmpty = buttons.every((button) => {
      return button.textContent === "";
    });

    expect(allButtonsEmpty).toBeTruthy();
  });
  it("should render 3 rows", async () => {
    render(
      <Board
        size={initializedSize}
        board={initializedBoard}
        onClick={mockedOnClick}
      />
    );

    const rowsLength = screen.getAllByTestId("rowWrapper").length;

    expect(rowsLength).toEqual(initializedSize);
  });
});

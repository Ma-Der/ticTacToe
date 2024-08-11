import { fireEvent, render, screen } from "@testing-library/react";
import { Game } from "./gameWrapper";

describe("game", () => {

  it("should render game of tic tac toe", async () => {
    render(<Game />);

    const titleElement = screen.getByText(/next player/i);

    expect(titleElement).toBeInTheDocument();
  });

  it("should render game with size 5x5", async () => {
    render(<Game />);
    const size = 5;

    const selectElement: HTMLSelectElement = screen.getByTestId("select-test");
    const optionElement: HTMLOptionElement[] =
      screen.getAllByTestId("option-test");

    fireEvent.change(selectElement, { target: { value: size } });

    expect(optionElement[selectElement.selectedIndex].selected).toBeTruthy();
  });
});

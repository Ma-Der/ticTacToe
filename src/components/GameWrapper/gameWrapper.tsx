import { useMachine } from "@xstate/react";
import { ticTacToeMachine } from "../../machines/ticTacToe";
import { Board } from "../Board/board";
import { GamerWrapper } from "../styled/GameWrapper/GameWrapper.styled";
import { SizeLabel } from "../styled/GameWrapper/Size/Label.styled";
import { Select } from "../styled/GameWrapper/Size/Select.styled";
import { Option } from "../styled/GameWrapper/Size/Option.styled";
import { Status } from "../Status/status";

export const Game = () => {
  const [state, send] = useMachine(ticTacToeMachine);

  const handleClick = (index: number) => {
    if (!state.context.board[index] && state.matches("playing")) {
      send({ type: "MAKE_MOVE", index });
    }
  };

  const handleSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(event.target.value);
    if (isNaN(size)) {
      send({ type: "SET_SIZE", size: 3 });
      return;
    }
    send({ type: "SET_SIZE", size });
  };

  const handleReset = () => {
    send({ type: "RESET" });
  };

  const status = state.matches("won")
    ? `Winner: ${state.context.winner}`
    : state.matches("draw")
    ? "Draw"
    : `Next player: ${state.context.xIsNext ? "X" : "O"}`;

  return (
    <GamerWrapper>
      <SizeLabel htmlFor="size">
        Select Size:{" "}
        <Select data-testid="select-test" id="size" onChange={handleSize}>
          <Option data-testid="option-test" value="3">
            {"3x3"}
          </Option>
          <Option data-testid="option-test" value="4">
            {"4x4"}
          </Option>
          <Option data-testid="option-test" value="5">
            {"5x5"}
          </Option>
        </Select>
      </SizeLabel>
      <Board
        size={state.context.size}
        board={state.context.board}
        onClick={handleClick}
      />
      <Status status={status} handleReset={handleReset} />
    </GamerWrapper>
  );
};

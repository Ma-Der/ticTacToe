import React from "react";
import { Square } from "../Square/square";
import { RowWrapper } from "../styled/RowWrapper.styled";
import { BoardWrapper } from "../styled/BoardWrapper.styled";

interface BoardProps {
  size: number;
  board: Array<string | null>;
  onClick: (index: number) => void;
}

export const Board = ({ size, board, onClick }: BoardProps) => {
  const renderSquare = (i: number) => {
    return <Square key={i} value={board[i]} onClick={() => onClick(i)} />;
  };

  const renderRow = (rowIndex: number) => {
    const row = [];
    for (let col = 0; col < size; col++) {
      row.push(renderSquare(rowIndex * size + col));
    }
    return (
      <RowWrapper data-testid="rowWrapper" key={rowIndex}>
        {row}
      </RowWrapper>
    );
  };

  const boardRows = [];
  for (let row = 0; row < size; row++) {
    boardRows.push(renderRow(row));
  }

  return <BoardWrapper>{boardRows}</BoardWrapper>;
};

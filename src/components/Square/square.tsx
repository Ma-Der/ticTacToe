import React from "react";
import { SquareBtn } from "../styled/Square.styled";

export interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export const Square = ({ value, onClick }: SquareProps) => {
  return <SquareBtn onClick={onClick}>{value}</SquareBtn>;
};

import React from "react";
import { StatusWrapper } from "../styled/StatusWrapper.styled";
import { Button } from "../styled/Button.styled";

interface StatusProps {
  status: string;
  handleReset: () => void;
}

export const Status = ({ status, handleReset }: StatusProps) => {
  return (
    <StatusWrapper>
      <span>{status}</span>
      <Button onClick={handleReset}>Reset</Button>
    </StatusWrapper>
  );
};

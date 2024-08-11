import styled from "styled-components";

export const SquareBtn = styled.button`
  height: 50px;
  width: 50px;
  padding: 5px;
  background: #322d31;
  border: 1px solid #000;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0px 0px 5px 2px #fff;
  cursor: pointer;

  &:hover {
    background-color: #9897a9;
    transition: 0.2s ease;
    border: none;
  }
`;

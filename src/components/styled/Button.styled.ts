import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 20px 0;
  border-radius: 25px;
  min-width: 200px;
  &:hover {
    background-color: #fff;
    color: #000;
    transition: 0.2s ease;
  }
`;

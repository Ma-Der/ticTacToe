import React from "react";
import { Game } from "./components/GameWrapper/gameWrapper";
import { Container } from "./components/styled/Container.styled";
import { Header } from "./components/Header";

function App() {
  return (
    <Container>
      <Header />
      <Game />
    </Container>
  );
}

export default App;

import React from "react";

import GameBoard from "./components/GameBoard";
import GameMenu from "./components/GameMenu";

function Root(props) {
  return (
    <div className="app">
      <div className="board">
        <GameBoard />
      </div>
      <GameMenu />
    </div>
  );
}

export default Root;

import React from "react";

import GameBoard from "./GameBoard";
import GameMenu from "./GameMenu";

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

import React from "react";
import { inject } from "mobx-react";

import Squares from "./Squares";

// TODO: Player Turns, Crowns, Declare Winner
function GameBoard({ gameBoard, squareSelected }) {
  return gameBoard.map((squares, y) =>
    <div key={y} className="row">
      <Squares squares={squares} squareSelected={squareSelected} />
    </div>
  );
}

export default inject(({ store }) => ({
  gameBoard: store.gameBoard,
  squareSelected: store.squareSelected
}))(GameBoard);

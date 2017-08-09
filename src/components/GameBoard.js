import React from "react";
import { inject, observer } from "mobx-react";

import Squares from "./Squares";

// TODO: Player Turns, Crowns, Declare Winner
function GameBoard({ gameBoard }) {
  return gameBoard.map((squares, y) =>
    <div key={y} className="row">
      <Squares squares={squares} />
    </div>
  );
}

export default inject(({ store }) => ({
  gameBoard: store.gameBoard
}))(observer(GameBoard));

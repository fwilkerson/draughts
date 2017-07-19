import React from "react";
import { observer } from "mobx-react";

import { Marker, Square } from "../components";
import { isSquareActive } from "../utils";

// TODO: Player Turns, Crowns, Declare Winner
const App = props => {
  const { activeSquare, gameBoard, squareSelected } = props.store;
  return (
    <div className="board">
      {gameBoard.map((squares, y) =>
        <div key={y} className="row">
          {squares.map((player, x) =>
            <Square key={x} y={y} x={x} onClick={() => squareSelected(y, x)}>
              {player &&
                <Marker
                  active={isSquareActive(activeSquare, y, x)}
                  player={player}
                />}
            </Square>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(App);

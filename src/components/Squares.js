import React from "react";
import { observer } from "mobx-react";

import Marker from "./Marker";
import { getOffset, memoize } from "../utils";

const getSquareStyle = memoize(
  (y, x) => `square${x % 2 === getOffset(y) ? " black" : ""}`
);

function Squares({ squares, squareSelected }) {
  return squares.map(square =>
    <div
      key={square.x}
      className={getSquareStyle(square.y, square.x)}
      onClick={() => squareSelected(square.y, square.x)}
    >
      {square.player && <Marker {...square} />}
    </div>
  );
}

export default observer(Squares);

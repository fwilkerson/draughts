import React from "react";
import { inject, observer } from "mobx-react";

import Marker from "./Marker";
import { getOffset, memoize } from "../utils";

const getSquareStyle = memoize(
  (y, x) => `square${x % 2 === getOffset(y) ? " black" : ""}`
);

function Squares({ y, squares, squareSelected }) {
  return squares.map((square, x) =>
    <div
      key={x}
      className={getSquareStyle(y, x)}
      onClick={() => squareSelected(y, x)}
    >
      {square.player && <Marker {...square} />}
    </div>
  );
}

export default inject(({ store }) => ({
  squareSelected: store.squareSelected
}))(observer(Squares));

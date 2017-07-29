import React from "react";
import { inject, observer } from "mobx-react";

function GameMenuActions({ endTurn, resetGame }) {
  return (
    <div className="actions">
      <button onClick={endTurn}>End Turn</button>
      <button>Undo</button>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default inject(({ store }) => ({
  endTurn: store.endTurn,
  resetGame: store.resetGame
}))(observer(GameMenuActions));

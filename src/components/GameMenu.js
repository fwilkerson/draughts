import React from "react";
import { inject, observer } from "mobx-react";

import GameMenuActions from "./GameMenuActions";

function GameMenu({ player }) {
  return (
    <div className="menu">
      <p>current turn</p>
      <h2>
        {player}
      </h2>
      <GameMenuActions />
    </div>
  );
}

export default inject(({ store }) => ({
  player: store.playerDisplay
}))(observer(GameMenu));

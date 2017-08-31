import React from "react";
import { observer } from "mobx-react";

import { memoize } from "../utils";

const getMarkerStyle = memoize(
  (player, active) => `circle ${player}${active ? " active" : ""}`
);

function Marker({ player, active }) {
  return <div className={getMarkerStyle(player, active)} />;
}

export default observer(Marker);

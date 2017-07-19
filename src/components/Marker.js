import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { PLAYER_ONE, PLAYER_TWO } from "../constants";

const Marker = ({ player, active }) =>
  <div className={`circle ${player}${active ? " active" : ""}`} />;

Marker.propTypes = {
  player: PropTypes.oneOf([PLAYER_ONE, PLAYER_TWO]).isRequired,
  active: PropTypes.bool
};

export default observer(Marker);

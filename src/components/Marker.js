import React from "react";
import PropTypes from "prop-types";

const Marker = props =>
  <div className={`circle ${props.player}${props.active ? " active" : ""}`} />;

Marker.propTypes = {
  player: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default Marker;

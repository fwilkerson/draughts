import React from "react";
import PropTypes from "prop-types";

import { getOffset } from "../utils";

const Square = ({ y, x, onClick, children }) =>
  <div className={getClassList(y, x)} onClick={onClick}>
    {children}
  </div>;

function getClassList(y, x) {
  return `square${x % 2 === getOffset(y) ? " black" : ""}`;
}

Square.propTypes = {
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Square;

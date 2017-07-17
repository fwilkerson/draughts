import React from "react";
import PropTypes from "prop-types";

const Square = ({ x, offset, onClick, marker }) =>
  <div
    key={x}
    className={`square${x % 2 === offset ? " black" : ""}`}
    onClick={onClick}
  >
    {marker}
  </div>;

Square.propTypes = {
  x: PropTypes.number.isRequired,
  offset: PropTypes.oneOf([0, 1]).isRequired,
  onClick: PropTypes.func.isRequired,
  marker: PropTypes.element
};

export default Square;

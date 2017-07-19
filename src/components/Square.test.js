import React from "react";
import ReactDOM from "react-dom";
import Square from "./Square";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Square x={1} y={0} onClick={() => {}} />, div);
});

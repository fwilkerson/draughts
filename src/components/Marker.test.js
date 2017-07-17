import React from "react";
import ReactDOM from "react-dom";
import Marker from "./Marker";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Marker player="player-two" />, div);
});

it("adds the player class", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Marker player="player-one" />, div);
  const marker = div.querySelector(".player-one");
  expect(marker).not.toEqual(null);
});

it("adds the active class", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Marker player="player-one" active />, div);
  const marker = div.querySelector(".active");
  expect(marker).not.toEqual(null);
});

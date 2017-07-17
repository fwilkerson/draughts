import React, { Component } from "react";

import { Marker, Square } from "../components";
import { getInitialBoardState, getOffset, isSquareActive } from "../utils";

// TODO: Player Turns, Crowns, Declare Winner
class App extends Component {
  state = {
    rows: getInitialBoardState(),
    activeSquare: null
  };

  squareClicked = (y, x) => {
    const { rows, activeSquare } = this.state;
    const targetSquare = rows[y][x];

    if (targetSquare) {
      if (!activeSquare || targetSquare === activeSquare.marker) {
        this.setState({ activeSquare: { y, x, marker: targetSquare } });
      }
      return;
    }

    if (!activeSquare) return;

    let isValidMove = false;
    let pieceToRemove = null;

    // TODO: Player one cannot move positive y unless the piece is a crown
    // TODO: Player two cannot move negative y unless the piece is a crown

    // possible moves without jumps
    if (y === activeSquare.y + 1 || y === activeSquare.y - 1) {
      if (x === activeSquare.x + 1 || x === activeSquare.x - 1) {
        isValidMove = true;
      }
    }

    // Handle single jump
    if (y === activeSquare.y + 2 && x === activeSquare.x + 2) {
      const downRight = rows[activeSquare.y + 1][activeSquare.x + 1];
      if (downRight && downRight !== activeSquare.marker) {
        isValidMove = true;
        pieceToRemove = { y: activeSquare.y + 1, x: activeSquare.x + 1 };
      }
    }

    if (y === activeSquare.y + 2 && x === activeSquare.x - 2) {
      const downLeft = rows[activeSquare.y + 1][activeSquare.x - 1];
      if (downLeft && downLeft !== activeSquare.marker) {
        isValidMove = true;
        pieceToRemove = { y: activeSquare.y + 1, x: activeSquare.x - 1 };
      }
    }

    if (y === activeSquare.y - 2 && x === activeSquare.x + 2) {
      const upRight = rows[activeSquare.y - 1][activeSquare.x + 1];
      if (upRight && upRight !== activeSquare.marker) {
        isValidMove = true;
        pieceToRemove = { y: activeSquare.y - 1, x: activeSquare.x + 1 };
      }
    }

    if (y === activeSquare.y - 2 && x === activeSquare.x - 2) {
      const upLeft = rows[activeSquare.y - 1][activeSquare.x - 1];
      if (upLeft && upLeft !== activeSquare.marker) {
        isValidMove = true;
        pieceToRemove = { y: activeSquare.y - 1, x: activeSquare.x - 1 };
      }
    }

    if (!isValidMove) return;

    this.setState({
      rows: rows.map((col, y2) =>
        col.map((marker, x2) => {
          // clear original position
          if (y2 === activeSquare.y && x2 === activeSquare.x) return "";
          // claim new position
          if (y === y2 && x === x2) return activeSquare.marker;
          // if a piece was jumped, remove the jumped piece
          if (pieceToRemove && y2 === pieceToRemove.y && x2 === pieceToRemove.x)
            return "";
          // square is unchanged
          return marker;
        })
      ),
      activeSquare: null
    });
  };

  renderSquare(y, x, player) {
    const { activeSquare } = this.state;
    const marker = player
      ? Marker({
          active: isSquareActive(activeSquare, y, x),
          player
        })
      : null;
    return Square({
      offset: getOffset(y),
      onClick: () => this.squareClicked(y, x),
      x,
      marker
    });
  }

  render() {
    return (
      <div className="board">
        {this.state.rows.map((col, y) =>
          <div key={y} className="row">
            {col.map((player, x) => this.renderSquare(y, x, player))}
          </div>
        )}
      </div>
    );
  }
}

export default App;

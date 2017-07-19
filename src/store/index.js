import { action, observable } from "mobx";

import {
  getInitialBoardState,
  getJumpedSquare,
  isJumpLocationValid,
  isMoveValid
} from "../utils";

export default observable({
  gameBoard: getInitialBoardState(),
  activeSquare: null,
  squareSelected: action.bound(function(y, x) {
    const { activeSquare, gameBoard } = this;
    const targetSquare = gameBoard[y][x];

    // is the square occupied?
    if (targetSquare) {
      // can target square become the active square?
      if (!activeSquare || targetSquare === activeSquare.player)
        this.activeSquare = { y, x, player: targetSquare };
      return;
    }

    // active square needs a value to proceed
    if (!activeSquare) return;

    if (isMoveValid(activeSquare, y, x)) return claimSquare.call(this, y, x);

    const direction = isJumpLocationValid(activeSquare, y, x);
    if (!direction) return;

    const jumpedSquare = getJumpedSquare(activeSquare, gameBoard, direction);
    if (jumpedSquare) return claimSquare.call(this, y, x, jumpedSquare);
  })
});

/**
 * Private MobX action for claiming a square after a successful move.
 * @function
 * @param {number} y - location on y axis
 * @param {number} x - location on x axis
 * @param {?Object} jumpedSquare - if move was a jump, this square will be cleared
 */
const claimSquare = action(function(y, x, jumpedSquare = null) {
  if (jumpedSquare) this.gameBoard[jumpedSquare.y][jumpedSquare.x] = "";
  this.gameBoard[this.activeSquare.y][this.activeSquare.x] = "";
  this.gameBoard[y][x] = this.activeSquare.player;
  this.activeSquare = null;
});

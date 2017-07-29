import { action, computed, observable } from "mobx";

import {
  getInitialBoardState,
  getJumpedSquare,
  isJumpLocationValid,
  isMoveValid,
  PLAYER_ONE,
  switchPlayer
} from "../utils";

export default observable({
  gameBoard: getInitialBoardState(),
  activeSquare: null,
  activePlayer: PLAYER_ONE,
  playerDisplay: computed(function() {
    return this.activePlayer === PLAYER_ONE ? "brown" : "orange";
  }),
  squareSelected: action.bound(function(y, x) {
    const { activeSquare, gameBoard } = this;
    const targetSquare = gameBoard[y][x];

    if (targetSquare.player === this.activePlayer) {
      // is the player simply switching pieces?
      if (activeSquare) this.activeSquare.active = false;

      // set the new active square
      this.activeSquare = targetSquare;
      this.activePlayer = targetSquare.player;
      this.activeSquare.active = true;

      return;
    }

    // active square needs a value to proceed
    if (!activeSquare) return;

    if (isMoveValid(activeSquare, y, x)) return claimSquare.call(this, y, x);

    const direction = isJumpLocationValid(activeSquare, y, x);
    if (!direction) return;

    const jumpedSquare = getJumpedSquare(activeSquare, gameBoard, direction);
    if (jumpedSquare) return claimSquare.call(this, y, x, jumpedSquare);
  }),
  endTurn: action.bound(function() {
    this.activePlayer = switchPlayer(this.activePlayer);
  }),
  resetGame: action.bound(function() {
    this.gameBoard = getInitialBoardState();
    this.activeSquare = null;
    this.activePlayer = PLAYER_ONE;
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
  if (jumpedSquare) jumpedSquare.player = "";
  this.activeSquare.player = "";
  this.activeSquare.active = false;
  this.gameBoard[y][x].player = this.activePlayer;
  this.activeSquare = null;
});

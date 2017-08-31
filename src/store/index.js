import { action, computed, observable } from "mobx";

import {
  getDefaultBoard,
  getJumpedSquare,
  isJumpLocationValid,
  isMoveValid,
  PLAYER_ONE,
  switchPlayer
} from "../utils";

export default observable({
  gameBoard: getDefaultBoard(),
  activeSquare: null,
  activePlayer: PLAYER_ONE,
  playerDisplay: computed(getPlayerName),
  squareSelected: action.bound(squareSelected),
  claimSquare: action.bound(claimSquare),
  endTurn: action.bound(endTurn),
  resetGame: action.bound(resetGame)
});

function getPlayerName() {
  return this.activePlayer === PLAYER_ONE ? "brown" : "orange";
}

function squareSelected(y, x) {
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

  if (isMoveValid(activeSquare, y, x)) return this.claimSquare(y, x);

  const direction = isJumpLocationValid(activeSquare, y, x);
  if (!direction) return;

  const jumpedSquare = getJumpedSquare(activeSquare, gameBoard, direction);
  if (jumpedSquare) return this.claimSquare(y, x, jumpedSquare);
}

function endTurn() {
  if (this.activeSquare) {
    this.activeSquare.active = false;
    this.activeSquare = null;
  }
  this.activePlayer = switchPlayer(this.activePlayer);
}

function resetGame() {
  this.gameBoard = getDefaultBoard();
  this.activeSquare = null;
  this.activePlayer = PLAYER_ONE;
}

/**
 * Apply active player's marker to a square after successful move.
 * @function
 * @param {number} y - location on y axis
 * @param {number} x - location on x axis
 * @param {?Object} jumpedSquare - if move was a jump, this square will be cleared
 */
function claimSquare(y, x, jumpedSquare = null) {
  if (jumpedSquare) jumpedSquare.player = "";
  this.activeSquare.player = "";
  this.activeSquare.active = false;
  this.gameBoard[y][x].player = this.activePlayer;
  this.activeSquare = null;
}

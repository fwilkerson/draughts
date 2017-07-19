import { PLAYER_ONE, PLAYER_TWO, RIGHT, LEFT } from "../constants";

export function getInitialBoardState() {
  const board = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
  ];
  for (let y = 0; y < 8; y++) {
    const offset = getOffset(y);
    for (let x = 0; x < 8; x++) {
      const live = x % 2 === offset;
      if (live) {
        if (y < 3) {
          board[y][x] = PLAYER_TWO;
        }
        if (y > 4) {
          board[y][x] = PLAYER_ONE;
        }
      }
    }
  }
  return board;
}

export function getOffset(y) {
  return (y + 1) % 2;
}

export function isSquareActive(activeSquare, y, x) {
  if (!activeSquare) return false;
  return activeSquare.y === y && activeSquare.x === x;
}

export function isMoveValid(activeSquare, y, x) {
  // moving along x axis is same for both players
  const xIsValid = x === activeSquare.x + 1 || x === activeSquare.x - 1;

  switch (activeSquare.player) {
    case PLAYER_ONE:
      return y === activeSquare.y - 1 && xIsValid;
    case PLAYER_TWO:
      return y === activeSquare.y + 1 && xIsValid;
    default:
      return false;
  }
}

export function isJumpLocationValid(activeSquare, y, x) {
  let yIsValid;
  switch (activeSquare.player) {
    case PLAYER_ONE:
      yIsValid = y === activeSquare.y - 2;
      break;
    case PLAYER_TWO:
      yIsValid = y === activeSquare.y + 2;
      break;
    default:
      return false;
  }
  if (!yIsValid) return false;

  if (x === activeSquare.x + 2) {
    return RIGHT;
  }
  if (x === activeSquare.x - 2) {
    return LEFT;
  }

  return false;
}

export function getJumpedSquare(activeSquare, gameBoard, direction) {
  let targetX;
  switch (direction) {
    case RIGHT:
      targetX = activeSquare.x + 1;
      break;
    case LEFT:
      targetX = activeSquare.x - 1;
      break;
    default:
      return null;
  }

  let targetY;
  switch (activeSquare.player) {
    case PLAYER_ONE:
      targetY = activeSquare.y - 1;
      break;
    case PLAYER_TWO:
      targetY = activeSquare.y + 1;
      break;
    default:
      return null;
  }

  const jumpedSquare = gameBoard[targetY][targetX];

  if (jumpedSquare && jumpedSquare !== activeSquare.player)
    return { y: targetY, x: targetX };

  return null;
}

export const PLAYER_ONE = "player-one",
  PLAYER_TWO = "player-two",
  RIGHT = "RIGHT",
  LEFT = "LEFT";

export function getDefaultBoard() {
  const board = [];
  for (let y = 0; y < 8; y++) {
    board.push([]);
    for (let x = 0; x < 8; x++) {
      board[y].push({
        active: false,
        player: getPlayer(y, x),
        x,
        y
      });
    }
  }
  return board;
}

function getPlayer(y, x) {
  if (x % 2 === getOffset(y)) {
    if (y < 3) return PLAYER_TWO;
    if (y > 4) return PLAYER_ONE;
  }
  return "";
}

export const getOffset = memoize(y => {
  return (y + 1) % 2;
});

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

  if (jumpedSquare.player && jumpedSquare.player !== activeSquare.player)
    return jumpedSquare;

  return null;
}

export const switchPlayer = memoize(activePlayer => {
  return activePlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
});

export function memoize(func) {
  const cache = {};
  return function() {
    const key = JSON.stringify(arguments);
    if (cache[key]) return cache[key];
    const val = func.apply(this, arguments);
    cache[key] = val;
    return val;
  };
}

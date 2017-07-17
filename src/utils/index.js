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
          board[y][x] = "player-two";
        }
        if (y > 4) {
          board[y][x] = "player-one";
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

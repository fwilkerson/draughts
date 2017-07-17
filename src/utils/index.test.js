import { getInitialBoardState, getOffset, isSquareActive } from "./index.js";

describe("getInitialBoardState", () => {
  it("returns an 8x8 grid", () => {
    const result = getInitialBoardState();

    expect(result).toHaveLength(8);
    result.forEach(col => {
      expect(col).toHaveLength(8);
    });
  });
  // TODO: Add tests that ensure pieces are in proper starting position
});

describe("getOffset", () => {
  it("returns 1 when provided an even y", () => {
    const oneResult = getOffset(4);
    expect(oneResult).toEqual(1);
  });
  it("returns 0 when provided an odd y", () => {
    const zeroResult = getOffset(7);
    expect(zeroResult).toEqual(0);
  });
});

describe("isSquareActive", () => {
  it("returns false when no square is active", () => {
    const result = isSquareActive(null);
    expect(result).toEqual(false);
  });
  it("returns false if x & y do not match active square", () => {
    const activeSquare = { y: 1, x: 1 };
    const result = isSquareActive(activeSquare, 2, 1);
    expect(result).toEqual(false);
  });
  it("returns true if x & y match active square", () => {
    const activeSquare = { y: 1, x: 1 };
    const result = isSquareActive(activeSquare, 1, 1);
    expect(result).toEqual(true);
  });
});

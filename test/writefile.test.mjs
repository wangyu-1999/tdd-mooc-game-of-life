import { beforeEach, afterEach, test, describe } from "vitest";
import { expect } from "chai";
import { Board } from "../src/board.mjs";
import { getInfoLine } from "../src/writefile.mjs";

describe("writeFile tests", () => {
  test("getInfoLine test 1", () => {
    const board = new Board();
    const originalUpdateLength = board.updateLength;
    const originalUpdateHeight = board.updateHeight;
    board.updateLength = () => (board.length = 5);
    board.updateHeight = () => (board.height = 10);
    expect(getInfoLine(board)).to.equal("x = 5, y = 10, rule = B3/S23");
    board.updateLength = originalUpdateLength;
    board.updateHeight = originalUpdateHeight;
  });

  test("getInfoLine test 2", () => {
    const board = new Board();
    const originalUpdateLength = board.updateLength;
    const originalUpdateHeight = board.updateHeight;
    board.updateLength = () => (board.length = 15);
    board.updateHeight = () => (board.height = 20);
    expect(getInfoLine(board)).to.equal("x = 15, y = 20, rule = B3/S23");
    board.updateLength = originalUpdateLength;
    board.updateHeight = originalUpdateHeight;
  });
});

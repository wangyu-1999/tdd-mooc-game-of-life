import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";

describe("Board tests", () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  test("should initialize an empty board", () => {
    expect(board.board.size).to.equal(0);
  });

  test("board should add a cell", () => {
    board.add(1, 2);
    expect(board.has(1, 2)).to.be.true;
  });

  test("board should remove a cell", () => {
    board.add(1, 2);
    board.add(3, 4);
    board.remove(1, 2);
    expect(board.has(1, 2)).to.be.false;
    expect(board.has(3, 4)).to.be.true;
    expect(board.board.size).to.equal(1);
  });

  test("test stringToVector function", () => {
    const vector = board.stringToVector("1,2");
    expect(vector).to.deep.equal([1, 2]);
  });

  test("test getLength function 1", () => {
    board.add(1, 2);
    board.add(3, 4);
    expect(board.getLength()).to.equal(3);
  });

  test("test getLength function 2", () => {
    board.add(-1, 2);
    board.add(4, 4);
    expect(board.getLength()).to.equal(6);
  });

  test("test getHeight function 1", () => {
    board.add(1, 2);
    board.add(3, 4);
    expect(board.getHeight()).to.equal(3);
  });

  test("test getHeight function 2", () => {
    board.add(-1, -2);
    board.add(4, 4);
    expect(board.getHeight()).to.equal(7);
  });
});

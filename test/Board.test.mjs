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

  test("test updateLength function 1", () => {
    board.add(1, 2);
    board.add(3, 4);
    board.updateLength();
    expect(board.length).to.equal(3);
  });

  test("test updateLength function 2", () => {
    board.add(-1, 2);
    board.add(4, 4);
    board.updateLength();
    expect(board.length).to.equal(6);
  });

  test("test updateHeight function 1", () => {
    board.add(1, 2);
    board.add(3, 4);
    board.updateHeight();
    expect(board.height).to.equal(3);
  });

  test("test updateHeight function 2", () => {
    board.add(-1, -2);
    board.add(4, 4);
    board.updateHeight();
    expect(board.height).to.equal(7);
  });
});

describe("numberStrToNumber function", () => {
  test("should return 1 for empty string", () => {
    expect(Board.numberStrToNumber("")).to.equal(1);
  });

  test("should return number for valid string 1", () => {
    expect(Board.numberStrToNumber("5")).to.equal(5);
  });

  test("should return number for valid string 2", () => {
    expect(Board.numberStrToNumber("24")).to.equal(24);
  });

  test("should throw error for invalid string 1", () => {
    expect(() => Board.numberStrToNumber("24b")).to.throw("Invalid string");
  });

  test("should throw error for invalid string 2", () => {
    expect(() => Board.numberStrToNumber("b")).to.throw("Invalid string");
  });

  test("should throw error for invalid string 3", () => {
    expect(() => Board.numberStrToNumber("$")).to.throw("Invalid string");
  });
});

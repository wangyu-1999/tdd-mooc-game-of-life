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

  test("board should remove a cell 2", () => {
    board.add(1, 2);
    board.add(3, 4);
    board.add(5, 6);
    board.remove(1, 2);
    expect(board.has(1, 2)).to.be.false;
    expect(board.has(3, 4)).to.be.true;
    expect(board.board.size).to.equal(2);
  });

  test("test stringToVector function", () => {
    const vector = board.stringToVector("1,2");
    expect(vector).to.deep.equal([1, 2]);
  });

  test("test updateLength function 1", () => {
    board.add(1, 2);
    board.add(3, 4);
    board.updateLength();
    expect(board.minX).to.equal(1);
    expect(board.maxX).to.equal(3);
    expect(board.length).to.equal(3);
  });

  test("test updateLength function 2", () => {
    board.add(-1, 2);
    board.add(4, 4);
    board.updateLength();
    expect(board.minX).to.equal(-1);
    expect(board.maxX).to.equal(4);
    expect(board.length).to.equal(6);
  });

  test("test updateHeight function 1", () => {
    board.add(1, 2);
    board.add(3, 4);
    board.updateHeight();
    expect(board.minY).to.equal(2);
    expect(board.maxY).to.equal(4);
    expect(board.height).to.equal(3);
  });

  test("test updateHeight function 2", () => {
    board.add(-1, -2);
    board.add(4, 4);
    board.updateHeight();
    expect(board.minY).to.equal(-2);
    expect(board.maxY).to.equal(4);
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

describe("toString function", () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });
  test("should return empty string for empty board", () => {
    expect(board.toString()).to.equal("");
  });
  test("blinker", () => {
    const blinker = Board.getBoardFromRLEString("3o!");
    expect(blinker.toString()).to.equalShape(`XXX`);
  });
  test("block", () => {
    const block = Board.getBoardFromRLEString("2o$2o!");
    expect(block.toString()).to.equalShape(
      `XX
       XX`,
    );
  });
  test("glider", () => {
    const glider = Board.getBoardFromRLEString("bob$2bo$3o!");
    expect(glider.toString()).to.equalShape(
      `.X.
       ..X
       XXX`,
    );
  });

  test("myboard 1", () => {
    const myboard = Board.getBoardFromRLEString("2bo$bobo$b3o$obobo!");
    expect(myboard.toString()).to.equalShape(
      `..X..
       .X.X.
       .XXX.
       X.X.X`,
    );
  });

  test("myboard 2", () => {
    const myboard = Board.getBoardFromRLEString("o2bo2bo$2bobo$o2bo2bo!");
    expect(myboard.toString()).to.equalShape(
      `X..X..X
       ..X.X..
       X..X..X`,
    );
  });
});

describe("tick function", () => {
  test("blinker", () => {
    const blinker = Board.getBoardFromRLEString("3o!");
    blinker.tick();
    expect(blinker.toString()).to.equalShape(
      `X
       X
       X`,
    );
  });

  test("blinker 2", () => {
    const blinker = Board.getBoardFromRLEString("3o!");
    blinker.tick();
    blinker.tick();
    expect(blinker.toString()).to.equalShape(`XXX`);
  });

  test("block", () => {
    const block = Board.getBoardFromRLEString("2o$2o!");
    block.tick();
    expect(block.toString()).to.equalShape(
      `XX
       XX`,
    );
  });

  test("glider", () => {
    const glider = Board.getBoardFromRLEString("bob$2bo$3o!");
    glider.tick();
    expect(glider.toString()).to.equalShape(
      `X.X
       .XX
       .X.`,
    );
  });

  test("myboard 1", () => {
    const myboard = Board.getBoardFromRLEString("2bo$bobo$b3o$obobo!");
    myboard.tick();
    expect(myboard.toString()).to.equalShape(
      `..X..
       .X.X.
       X...X
       ..X..`,
    );
  });

  test("myboard 2", () => {
    const myboard = Board.getBoardFromRLEString("o2bo2bo$2bobo$o2bo2bo!");
    myboard.tick();
    expect(myboard.toString()).to.equalShape(
      `..X..
       XX.XX
       ..X..`,
    );
    myboard.tick();
    expect(myboard.toString()).to.equalShape(
      `XXX
       X.X
       XXX`,
    );
  });
});

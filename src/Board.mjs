export class Board {
  board;
  minX;
  maxX;
  minY;
  maxY;
  length;
  height;

  constructor() {
    this.board = new Set();
  }

  has(x, y) {
    return this.board.has(`${x},${y}`);
  }

  add(x, y) {
    this.board.add(`${x},${y}`);
  }

  remove(x, y) {
    this.board.delete(`${x},${y}`);
  }

  stringToVector(str) {
    return str.split(",").map(Number);
  }

  updateLength() {
    let minX = Infinity;
    let maxX = -Infinity;
    this.board.forEach((str) => {
      const element = this.stringToVector(str);
      if (element[0] < minX) {
        minX = element[0];
      }
      if (element[0] > maxX) {
        maxX = element[0];
      }
    });
    this.maxX = maxX;
    this.minX = minX;
    this.length = maxX - minX + 1;
  }

  updateHeight() {
    let minY = Infinity;
    let maxY = -Infinity;
    this.board.forEach((str) => {
      const element = this.stringToVector(str);
      if (element[1] < minY) {
        minY = element[1];
      }
      if (element[1] > maxY) {
        maxY = element[1];
      }
    });
    this.maxY = maxY;
    this.minY = minY;
    this.height = maxY - minY + 1;
  }

  static numberStrToNumber(str) {
    if (str === "") {
      return 1;
    }
    if (str.match(/^[0-9]+$/) && !isNaN(parseInt(str))) {
      return parseInt(str);
    } else {
      throw new Error("Invalid string");
    }
  }

  static getBoardFromRLEString(rleString) {
    const board = new Board();
    let x = 0;
    let y = 0;
    let numStr = "";
    for (let i = 0; i < rleString.length; i++) {
      if (rleString[i].match(/[0-9]/)) {
        numStr += rleString[i];
      } else if (rleString[i] === "b") {
        // dead
        const num = this.numberStrToNumber(numStr);
        x += num;
        numStr = "";
      } else if (rleString[i] === "o") {
        // alive
        const num = this.numberStrToNumber(numStr);
        for (let j = 0; j < num; j++) {
          board.add(x, y);
          x++;
        }
        numStr = "";
      } else if (rleString[i] === "$") {
        // end of the line
        const num = this.numberStrToNumber(numStr);
        y += num;
        x = 0;
        numStr = "";
      } else if (rleString[i] === "!") {
        // end of the string
        break;
      } else {
        // unknown character
        throw new Error("Invalid character");
      }
    }
    return board;
  }
}
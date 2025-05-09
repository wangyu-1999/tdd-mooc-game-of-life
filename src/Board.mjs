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

  toString() {
    this.updateHeight();
    this.updateLength();
    let str = "";
    for (let j = 0; j < this.height; j++) {
      let y = this.minY + j;
      for (let i = 0; i < this.length; i++) {
        let x = this.minX + i;
        if (this.has(x, y)) {
          str += "X";
        } else {
          str += ".";
        }
      }
      str += "\n";
    }
    return str;
  }

  tick() {
    this.updateHeight();
    this.updateLength();
    const newBoard = new Board();
    for (let i = this.minX - 1; i <= this.maxX + 1; i++) {
      for (let j = this.minY - 1; j <= this.maxY + 1; j++) {
        let neighbors = 0;
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (x === i && y === j) {
              continue;
            }
            if (this.has(x, y)) {
              neighbors++;
            }
          }
        }
        // born
        if (neighbors === 3) {
          newBoard.add(i, j);
        }
        // die
        if (neighbors < 2 || neighbors > 3) {
          newBoard.remove(i, j);
        }
        // survive
        if (neighbors === 2 && this.has(i, j)) {
          newBoard.add(i, j);
        }
      }
    }
    this.board = newBoard.board;
  }

  boardToRLEString() {
    this.updateHeight();
    this.updateLength();
    let rleString = "";
    let count = 0;
    let lastChar = "";
    let lineCount = 0;

    for (let j = this.minY; j <= this.maxY; j++) {
      for (let i = this.minX; i <= this.maxX; i++) {
        const cell = this.has(i, j);
        if (cell) {
          if (lineCount !== 0) {
            if (lineCount !== 1) {
              rleString += lineCount;
            }
            rleString += "$";
            lineCount = 0;
          }
          if (lastChar === "o" || lastChar === "") {
            count++;
            lastChar = "o";
          } else {
            if (count > 0) {
              if (count !== 1) {
                rleString += count;
              }
              rleString += lastChar;
              count = 1;
              lastChar = "o";
            }
          }
        } else {
          if (lastChar === "b" || lastChar === "") {
            count++;
            lastChar = "b";
          } else {
            if (count > 0) {
              if (count !== 1) {
                rleString += count;
              }
              rleString += lastChar;
              count = 1;
              lastChar = "b";
            }
          }
        }
      }
      if (lastChar === "b" && count === this.length) {
        count = 0;
        lastChar = "";
      } else {
        if (!(j === this.maxY && lastChar === "b")) {
          if (count > 0) {
            if (count !== 1) {
              rleString += count;
            }
            rleString += lastChar;
            count = 0;
            lastChar = "";
          }
        }
      }
      lineCount++;
    }
    return rleString + "!";
  }
}
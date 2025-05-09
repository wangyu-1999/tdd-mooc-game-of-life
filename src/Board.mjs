export class Board {
  board;
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

  getLength() {
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
    return maxX - minX + 1;
  }

  getHeight() {
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
    return maxY - minY + 1;
  }
}
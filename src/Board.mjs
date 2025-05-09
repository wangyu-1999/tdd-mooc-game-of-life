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
}
